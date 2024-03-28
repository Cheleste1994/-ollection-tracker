import { UPDATE_PROFILE_BY_ROLE } from '@/api/mutation/profile';
import { getAccessToken } from '@/services/auth-token.service';
import { UpdateProfileInput } from '@/types/profile';
import { useMutation } from '@apollo/client';

export function useUpdateProfileByRole() {
  const token = getAccessToken();

  const [updateProfile, { loading, error, data }] = useMutation(
    UPDATE_PROFILE_BY_ROLE,
    {
      context: {
        headers: {
          authorization: token ? `Bearer ${token}` : '',
        },
      },
    }
  );

  const handleUpdateProfile = async ({
    dto,
    userId,
  }: {
    userId: string | null;
    dto: UpdateProfileInput;
  }) => {
    if (userId) {
      await updateProfile({
        variables: {
          dto,
          userId,
        },
      });
    }
  };

  return {
    updateProfile: handleUpdateProfile,
    loading,
    data: data?.updateProfileByRole,
    error,
  };
}
