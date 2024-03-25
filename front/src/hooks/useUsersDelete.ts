import { USERS_DELETE } from '@/api/mutation/user';
import { getAccessToken } from '@/services/auth-token.service';
import { useMutation } from '@apollo/client';
import { useLogout } from './useLogout';

export function useUsersDelete() {
  const token = getAccessToken();

  const {logout} = useLogout();

  const [deleteUser, { loading, data, error }] = useMutation(USERS_DELETE, {
    fetchPolicy: 'network-only',
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    },
  });

  const handleDelete = async (userId: string) => {
    const { data } = await deleteUser({
      variables: {
        usersIds: [userId],
      },
    });

    if (data?.deleteUser.isCurrent) {
      await logout()
    }
  };

  return { deleteUser: handleDelete, loading, data, error };
}
