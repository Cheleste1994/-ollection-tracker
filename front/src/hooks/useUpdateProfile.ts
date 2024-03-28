import { UPDATE_PROFILE_BY_TOKEN } from '@/api/mutation/profile';
import { getAccessToken } from '@/services/auth-token.service';
import { UpdateProfileInput } from '@/types/profile';
import { useMutation } from '@apollo/client';
import { useProfile } from './useProfile';

export function useUpdateProfile() {
  const token = getAccessToken();

  const { refetch, data } = useProfile();

  const [updateProfile, { loading, error }] = useMutation(
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
    await refetch();
  };

  return { updateProfile: handleUpdateProfile, loading, data, error };
}
