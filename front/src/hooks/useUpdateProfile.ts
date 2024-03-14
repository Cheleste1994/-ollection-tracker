import { UPDATE_PROFILE_BY_TOKEN } from '@/api/mutation/profile';
import { getAccessToken } from '@/services/auth-token.service';
import { UpdateProfileInput } from '@/types/profile';
import { useMutation } from '@apollo/client';

export function useUpdateProfile() {
  const token = getAccessToken();

  const [updateProfile, { data, loading, error }] = useMutation(
    UPDATE_PROFILE_BY_TOKEN,
    {
      context: {
        headers: {
          authorization: token ? `Bearer ${token}` : '',
        },
      },
    }
  );

  const handleUpdateProfile = async (dto: UpdateProfileInput) => {
    await updateProfile({
      variables: {
        dto,
      },
    });
  };

  return { updateProfile: handleUpdateProfile, loading, data, error };
}
