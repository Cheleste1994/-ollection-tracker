import { UPDATE_USER_BY_ROLE } from '@/api/mutation/user';
import { getAccessToken } from '@/services/auth-token.service';
import { UpdateUserInput } from '@/types/user';
import { useMutation } from '@apollo/client';

export function useUpdateUserByRole() {
  const token = getAccessToken();

  const [updateUser, { loading, error, data }] = useMutation(
    UPDATE_USER_BY_ROLE,
    {
      context: {
        headers: {
          authorization: token ? `Bearer ${token}` : '',
        },
      },
    }
  );

  const handleUpdateUser = async ({
    dto,
    userId,
  }: {
    userId: string | null;
    dto: UpdateUserInput;
  }) => {
    if (userId) {
      await updateUser({
        variables: {
          dto,
          userId,
        },
      });
    }
  };

  return {
    updateUser: handleUpdateUser,
    loading,
    data: data?.updateUser,
    error,
  };
}
