# Frontend Dynamic Plugin Demo

A frontend dynamic plugin implement with Apollo & React.

## Develop

Clone this project
```shell
git clone https://github.com/BerlinChan/frontend-dynamic-plugin-demo.git
cd frontend-dynamic-plugin-demo
```

Start server side
```shell
cd server
yarn
yarn start
```

Start client side
```shell
cd client
yarn
yarn start
```

Visit demo UI at [http://localhost:3000](http://localhost:3000)

Visit Apollo playground at [http://localhost:4000](http://localhost:4000)

## Demo plugin

On *Manage* page, you can upload Demo plugin *baz-plugin.zip*, which in root of this project.

It contains two files. `metadata.json` descripted some basic information about this plugin, and `baz-bundle.js` is a minimized plugin entry file.

## 思路

前端动态加载插件，最小化情况的关键两点：

1. 获取已安装插件的列表，按照插件的 metadata 信息，**显示插件模块入口**。入口可以是导航菜单、Tab页、按钮等。
2. **加载并运行**插件入口 js 文件。入口文件运行后，可以是将插件内容渲染进核心程序界面预留的标签中，或弹出 Modal窗口等。

## 更多考虑

- 真实情况中，已安装插件的信息肯定是在数据库中维护的。本例为简单从文件中读取。
- 在大型项目中，需要为插件开发提供便于调试的环境，和打包插件的构建程序。
- 核心程序与插件、插件与插件之间的通讯，可以用抽象出的 store 实现。

还有更多复杂场景，在参照的文章作者写的第二篇 [Scale Your Frontend Application](https://dzone.com/articles/scale-your-frontend-application-dynamically) 中讨论了很多。

## Reference

- [Creating a Frontend Architecture With Dynamic Plugins](https://dzone.com/articles/dynamically-pluggable-frontend-architecture)
- [Scale Your Frontend Application](https://dzone.com/articles/scale-your-frontend-application-dynamically)
- [前端动态插件的实现 with Apollo & React](https://berlinchan.com/2020/11/frontend-dynamic-plugin-implement)
