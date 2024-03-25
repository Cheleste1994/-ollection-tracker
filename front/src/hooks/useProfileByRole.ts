import { GET_PROFILE_BY_ROLE, ProfileByRole } from '@/api/query/profile';
import { getAccessToken } from '@/services/auth-token.service';
import { useQuery } from '@apollo/client';
import { useLayoutEffect, useState } from 'react';


type Options = {
  userId: string | null
}

export function useProfileByRole({userId}: Options) {
  const token = getAccessToken();
  const [state, setState] = useState<ProfileByRole | undefined>();

  const { loading, data, error, refetch } = useQuery(GET_PROFILE_BY_ROLE, {
    fetchPolicy: 'network-only',
    ssr: false,
    skip: !userId,
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    },
    variables: {
      id: userId || ''
    }
  });

  useLayoutEffect(() => {
    setState(() => data?.profileByRole);
  }, [token, loading, data, error, refetch]);

  const handleRefetch = async () => {
    const result = await refetch()

    setState(() => result.data?.profileByRole)
  }


  return { isLoading: loading, error, data: state, refetch: handleRefetch };
}
