'use client';

import styles from './page.module.scss';
import dynamic from 'next/dynamic';
import { useProfileByToken } from '@/hooks/useProfileByToken';
import { Role } from '@/types/user';
import { useUsersDelete } from '@/hooks/useUsersDelete';

const TableItem = dynamic(() => import('@/components/Table/Table'), {
  ssr: false,
});

export default function Users() {
  const profile = useProfileByToken();
  const { deleteUser } = useUsersDelete();

  return (
    <div className={styles.page}>
      <TableItem
        role={Role[profile.data?.role || 'USER']}
        deleteUser={deleteUser}
      />
    </div>
  );
}
