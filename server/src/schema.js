const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    pluginList: [PluginItem!]!
    pluginDetail (id: String!): PluginDetail!
  }

  type Mutation {
    """
    安装插件
    """
    installPlugin(file: Upload!): PluginDetail!

    """
    删除插件
    """
    deletePlugin(id: String!): String!

  }

  """
  插件项目
  """
  type PluginItem {
    id: ID!
    name: String!
    entry: String!
    order: Int!
    title: String!
  }

  """
  插件详情
  """
  type PluginDetail {
    id: ID!
    name: String!
    entry: String!
    order: Int!
    title: String!
    permissions: [String!]!
  }
`;

module.exports = typeDefs;
