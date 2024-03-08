import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const link = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include'
});


const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link
});

export default apolloClient;
