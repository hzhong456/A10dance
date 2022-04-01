const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    username: String!
    name: String!
    id: Int
  }

  type Query {
    allUsers: [User]
    getUser(name: String!): User
  }

  type Mutation {
    addUser(
      username: String!
      name: String!
      id: Int
    ): User
  }
`;

module.exports = typeDefs;
