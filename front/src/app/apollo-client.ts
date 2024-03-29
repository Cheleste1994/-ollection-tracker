import { ProfileWithUserRes } from '@/api/query/profiles';
import {
  EnumTokens,
  getAccessToken,
  saveTokenStorage,
} from '@/services/auth-token.service';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

const uri = process.env.NEXT_PUBLIC_API_URL

const httpLink = createUploadLink({
  uri,
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
    typePolicies: {
      Query: {
        fields: {
          profiles: {
            merge(
              existing: ProfileWithUserRes[] = [],
              incoming: ProfileWithUserRes[]
            ) {
              const uniqueIncoming = incoming.filter(
                (newItem) =>
                  !existing.some((oldItem) => newItem.userId === oldItem.userId)
              );

              return [...existing, ...uniqueIncoming];
            },
          },
        },
      },
    },
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
