import { GET_PROFILE_BY_TOKEN } from '@/api/query/profile';
import { getAccessToken } from '@/services/auth-token.service';
import { useQuery } from '@apollo/client';

export function useProfile() {
  const token = getAccessToken();

  const { loading, data, error, refetch } = useQuery(GET_PROFILE_BY_TOKEN, {
    fetchPolicy: 'network-only',
    ssr: false,
    skip: !token,
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    },
  });


  if ((token && !data) || (!token && data)) {
      refetch();
  }

  return { isLoading: loading, error, data: data?.profileByToken, refetch };
}
