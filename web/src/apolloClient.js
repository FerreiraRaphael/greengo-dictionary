import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { ApolloLink } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

// const host = process.env.REACT_APP_HOST;
const host = 'greegodictionary.herokuapp.com';

// Create an http link:
const httpLink = new HttpLink({
  uri: `https://${host}/graphql`
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: `ws://${host}/graphql`,
  options: {
    reconnect: true,
    reconnectionAttempts: 50,
    lazy: true,
    timeout: 20000,
  }
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const links = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const link = ApolloLink.from([links]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
