'use client';

import styles from './page.module.scss';
import dynamic from 'next/dynamic';
import { useProfileByToken } from '@/hooks/useProfileByToken';
import { Role } from '@/types/user';
import { useUsersDelete } from '@/hooks/useUsersDelete';
import { useDisclosure } from '@nextui-org/react';
import ModalRegistration from '@/components/ModalRegistration/ModalRegistration';
import { useUpdateUserByRole } from '@/hooks/useUpdateUserByRole';

const TableUser = dynamic(() => import('@/components/TableUser/TableUser'), {
  ssr: false,
});

export default function Users() {
  const profile = useProfileByToken();
  const { deleteUser } = useUsersDelete();
  const controlModalRegistration = useDisclosure();
  const { updateUser } = useUpdateUserByRole();

  return (
    <div className={styles.page}>
      <TableUser
        role={Role[profile.data?.role || 'USER']}
        deleteUser={deleteUser}
        onOpenModalRegistration={controlModalRegistration.onOpen}
        updateUser={updateUser}
      />
      <ModalRegistration {...controlModalRegistration} />
    </div>
  );
}
