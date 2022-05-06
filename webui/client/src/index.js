import ReactDOM from 'react-dom';
import {
  ApolloClient, ApolloProvider, HttpLink, InMemoryCache,
} from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { setContext } from 'apollo-link-context';
import App from './App';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    },
  };
});

const httpLink = new HttpLink({
  uri: 'http://clnodevm014-1.clemson.cloudlab.us:40000/',
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'),
);
