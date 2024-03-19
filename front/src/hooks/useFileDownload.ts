import { FILES_DOWNLOAD } from '@/api/query/files';
import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useProfile } from './useProfile';

export function useFileDownload(id?: string) {
  const { refetch: refetchProfile } = useProfile();

  const { data, loading, error, refetch } = useQuery(FILES_DOWNLOAD, {
    fetchPolicy: 'cache-first',
    ssr: false,
    skip: !id,
    variables: {
      id: id || '',
    },
  });

  const handleRefetch = async (avatarId: string) => {
    await refetch({
      id: avatarId,
    });
    await refetchProfile();
  };

  return {
    urlBase64: data?.filesDownload,
    loading,
    error,
    refetch: handleRefetch,
  };
}
