import { gql } from '@apollo/client';

export const ALLUSERS = gql`
  query AllUsers {
    allUsers {
      username
      password
      name
      role
      attendanceCount
      id
    }
  }
`;

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
      user {
        name
      }
    }
  }
`;

export const REGISTER = gql`
  mutation AddUser($username: String!, $password: String!, $name: String!, $role: String!) {
    addUser(username: $username, password: $password, name: $name, role: $role) {
      value
    }
  }
`;

export const ME = gql`
  query {
    me {
      username
      name
      role
      attendanceCount
      id
    }
  }
`;
