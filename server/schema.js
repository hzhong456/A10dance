const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    username: String!
    name: String!
    role: String!
    id: ID!
  }

  type Query {
    allUsers: [User]
    getUser(username: String!): User
  }

  type Mutation {
    addUser(
      username: String!
      name: String!
      role: String!
    ): User
  }
`;

module.exports = typeDefs;
