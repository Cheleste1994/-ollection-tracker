'use client';

import styles from './page.module.scss';
import dynamic from 'next/dynamic';
import { useProfileByToken } from '@/hooks/useProfileByToken';
import { Role } from '@/types/user';
import { useUsersDelete } from '@/hooks/useUsersDelete';
import { useDisclosure } from '@nextui-org/react';
import ModalRegistration from '@/components/ModalRegistration/ModalRegistration';

const TableItem = dynamic(() => import('@/components/Table/Table'), {
  ssr: false,
});

export default function Users() {
  const profile = useProfileByToken();
  const { deleteUser } = useUsersDelete();
  const controlModalRegistration = useDisclosure();

  return (
    <div className={styles.page}>
      <TableItem
        role={Role[profile.data?.role || 'USER']}
        deleteUser={deleteUser}
        onOpenModalRegistration={controlModalRegistration.onOpen}
      />
      <ModalRegistration {...controlModalRegistration} />
    </div>
  );
}
