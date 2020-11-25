import React from 'react'
import { gql, useQuery, useLazyQuery, useMutation } from '@apollo/client';
import ReactJson from 'react-json-view'
import './Manage.css'

export const GET_PLUGIN_LIST = gql`
    query GET_PLUGIN_LIST {
        pluginList {
            id
            name
            entry
            order
            title
        }
    }
`;
const GET_PLUGIN_DETAIL = gql`
    query GET_PLUGIN_DETAIL($id: String!) {
        pluginDetail(id: $id) {
            id
            name
            entry
            order
            title
            permissions
        }
    }
`;
const INSTALL_PLUGIN = gql`
    mutation INSTALL_PLUGIN($file: Upload!) {
        installPlugin(file: $file) {
            id
            name
        }
    }
`;
const DELETE_PLUGIN = gql`
    mutation DELETE_PLUGIN($id: String!) {
        deletePlugin(id: $id)
    }
`;

const Loading = <p>Loading...</p>

const Manage = () => {
    const {loading, data, refetch } = useQuery(GET_PLUGIN_LIST);
    const [pluginDetailQuery, {loading: loadingDetail, data: dataDetail }] = useLazyQuery(GET_PLUGIN_DETAIL);
    const [installPluginMutation] = useMutation(INSTALL_PLUGIN);
    const [deletePluginMutation] = useMutation(DELETE_PLUGIN);
    const [selectedPluginId, setSelectedPluginId] = React.useState('');

    const handleUpload = async ({ target: { validity, files: [file] } }) => {
        if (validity.valid) {
            await installPluginMutation({ variables: { file } })
            refetch()
            const elem = document.getElementById("upload");
            elem.value = "";
        }
    }
    const handleDeletePlguin = async (id) => {
        await deletePluginMutation({ variables: { id } })
        refetch()
    }
    const handleSelectPlguin = async (id) => {
        setSelectedPluginId(id)
        if (id) {
            await pluginDetailQuery({variables:{id}})
        }
    }

    return (
        <React.Fragment>
            <h4>安装插件</h4>
            <input type="file" id="upload" accept=".zip" required onChange={handleUpload}></input>
            
            <h4>插件列表</h4>
            {loading ? Loading : <div className="plugin-list-and-detail">
                <ul className="plugin-list">
                    {data&&data.pluginList.map((item,index) => <li className={selectedPluginId===item.id?'selected':''} key={index}
                        onClick={()=>handleSelectPlguin(item.id)}>
                        <span>{item.title}</span>
                        <span className="delete" onClick={()=>handleDeletePlguin(item.id)}>x</span>
                    </li>)}
                </ul>
                <div className="plugin-detail">
                    {loadingDetail? Loading :
                        selectedPluginId&&dataDetail ? <ReactJson src={dataDetail.pluginDetail} /> : '请选择'}
                </div>
            </div>}
        </React.Fragment>
    )
}

export default Manage
