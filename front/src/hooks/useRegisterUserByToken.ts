import { REGISTER_USER_BY_TOKEN } from '@/api/mutation/user';
import { getAccessToken } from '@/services/auth-token.service';
import { CreateUserInput } from '@/types/user';
import { useMutation } from '@apollo/client';

export function useRegisterUserByToken() {
  const token = getAccessToken();

  const [createUser, { loading, data, error }] = useMutation(REGISTER_USER_BY_TOKEN, {
    fetchPolicy: 'network-only',
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    },
  });

  const handleCreateUser = async (dto: CreateUserInput) => {
    return createUser({
      variables: {
        dto,
      },
    });
  };

  return { createUser: handleCreateUser, loading, data, error };
}
