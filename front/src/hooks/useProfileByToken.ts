import { GET_PROFILE_BY_TOKEN, ProfileResQuery } from '@/api/query/profile';
import { getAccessToken } from '@/services/auth-token.service';
import { useQuery } from '@apollo/client';
import { useLayoutEffect, useState } from 'react';


type Options = {
  skip: boolean
}

export function useProfileByToken(options?: Options) {
  const token = getAccessToken();
  const [state, setState] = useState<ProfileResQuery | undefined>();

  const { loading, data, error, refetch } = useQuery(GET_PROFILE_BY_TOKEN, {
    fetchPolicy: 'network-only',
    ssr: false,
    skip: !token || options?.skip,
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    },
  });

  useLayoutEffect(() => {
    setState(() => data?.profileByToken);
  }, [token, loading, data, error, refetch]);

  const handleRefetch = async () => {
    const result = await refetch()

    setState(() => result.data.profileByToken)
  }


  return { isLoading: loading, error, data: state, refetch: handleRefetch };
}


export type UseProfileByTokenType = ReturnType<typeof useProfileByToken>
