import { gql } from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;
