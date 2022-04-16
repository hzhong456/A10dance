import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
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
