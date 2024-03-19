import { LOGOUT_USER_QUERY } from '@/api/query/users';
import { removeTokenFromStorage } from '@/services/auth-token.service';
import { useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';

export function useLogout() {
  const [logout, { loading, data, error }] = useLazyQuery(LOGOUT_USER_QUERY, {
    fetchPolicy: 'network-only',
    ssr: false,
  });

  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.refresh();
    removeTokenFromStorage();
  };

  return { logout: handleLogout, loading, data, error };
}
