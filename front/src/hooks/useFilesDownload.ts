import { FILES_DOWNLOAD } from '@/api/query/files';
import { FileDownload } from '@/types/files';
import { useQuery } from '@apollo/client';
import { useEffect, useLayoutEffect, useState } from 'react';

type ReturnType<T> = T extends string ? FileDownload : FileDownload[];

export function useFilesDownload<
  T extends string | string[],
  K = ReturnType<T> | undefined,
>(id?: T) {
  const arrId: string[] = Array.isArray(id) ? id : [id || ''];

  const [state, setState] = useState<FileDownload[] | undefined>();

  const { data, loading, error, refetch } = useQuery(FILES_DOWNLOAD, {
    fetchPolicy: 'cache-first',
    ssr: false,
    skip: !id,
    variables: {
      arrId,
    },
  });

  useLayoutEffect(() => {
    setState(() => data?.filesDownload);
  }, [data, loading, error, refetch]);

  const handleRefetch = async (avatarId: T) => {
    const result = await refetch({
      arrId: Array.isArray(avatarId) ? avatarId : [avatarId],
    });
    setState(() => result.data.filesDownload);
  };

  let urlBase64: K;

  if (typeof id === 'string') {
    urlBase64 = state?.[0] as K;
  } else {
    urlBase64 = state as K;
  }

  return {
    urlBase64,
    loading,
    error,
    refetch: handleRefetch,
  };
}
