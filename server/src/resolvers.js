const { readdir, rmdir, readFile } = require('fs/promises');
const unzipper = require('unzipper');

const UPLOAD_DIR = `${process.cwd()}/src/upload`
const METADATA_FILENAME = `metadata.json`

async function getPluginDetail(id) {
  const file = await readFile(`${UPLOAD_DIR}/${id}/${METADATA_FILENAME}`, {encoding:'utf8'});
  const metadata = JSON.parse(file);

  return {id: metadata.name, ...metadata}
}

module.exports = {
  Query: {
    pluginList: async (parent, args, context, info) => {
      try {
        const dirList = await readdir(UPLOAD_DIR, {withFileTypes:true});
        let detailList = await Promise.all(dirList.filter(item=>item.isDirectory()).map(async (item) => await getPluginDetail(item.name)))
        detailList.sort((a,b)=>a.order-b.order)

        return detailList
      } catch (error) {
        console.error("error", error)
        return error
      }
    },
    pluginDetail: (parent, {id}, context, info) => getPluginDetail(id),
  },
  Mutation: {
    installPlugin: async (parent, {file}, context, info) => {
      const { createReadStream, filename } = await file;
      const stream = createReadStream();
      const id = filename.replace(/.zip$/, '')

      await new Promise((resolve, reject) => {
        const extractStream = unzipper.Extract({ path: `${UPLOAD_DIR}/${id}` });
        // When the upload is fully extracted, resolve the promise.
        extractStream.on('close', resolve);

        stream.pipe(extractStream);
      });

      return await getPluginDetail(id)
    },
    deletePlugin: async (parent, {id}, context, info) => {
      await rmdir(`${UPLOAD_DIR}/${id}`, {recursive: true});
  
      return id
    },
  },
};
