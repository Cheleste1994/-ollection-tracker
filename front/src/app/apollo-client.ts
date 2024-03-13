import {
  EnumTokens,
  getAccessToken,
  saveTokenStorage,
} from '@/services/auth-token.service';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
  const accessToken = getAccessToken();

  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  };
});

const apolloClient = new ApolloClient({
  cache: new InMemoryCache({
    dataIdFromObject(responseObject) {
      if (
        responseObject.__typename === 'Auth' &&
        typeof responseObject[EnumTokens.ACCESS_TOKEN] === 'string'
      ) {
        saveTokenStorage(responseObject[EnumTokens.ACCESS_TOKEN]);
      }
      return false;
    },
  }),
  link: authLink.concat(httpLink),
});

export default apolloClient;
