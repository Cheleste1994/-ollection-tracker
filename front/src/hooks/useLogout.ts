import { LOGOUT_USER_QUERY } from '@/api/query/users';
import { removeTokenFromStorage } from '@/services/auth-token.service';
import { useLazyQuery } from '@apollo/client';

export function useLogout() {
  const [logout, { loading, data, error }] = useLazyQuery(LOGOUT_USER_QUERY, {
    fetchPolicy: 'network-only',
    ssr: false,
  });

  const handleLogout = () => {
    logout()
    removeTokenFromStorage()
  }

  return { logout: handleLogout, loading, data, error };
}
