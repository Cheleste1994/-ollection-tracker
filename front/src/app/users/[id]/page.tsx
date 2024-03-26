'use client';

import AboutForm from '@/components/Forms/AboutForm/AboutForm';
import ContactsForm from '@/components/Forms/ContactsForm/ContactsForm';
import UserContent from '@/components/UserContent/UserContent';
import { useProfileByRole } from '@/hooks/useProfileByRole';
import { useProfileByToken } from '@/hooks/useProfileByToken';
import { useUpdateProfileByRole } from '@/hooks/useUpdateProfileByRole';
import { useUpdateProfileByToken } from '@/hooks/useUpdateProfileByToken';
import { UpdateProfileInput } from '@/types/profile';
import { Role } from '@/types/user';
import { notFound, useSearchParams } from 'next/navigation';
import styles from './page.module.scss';

export default function User() {
  const { updateProfile } = useUpdateProfileByRole();

  const searchParams = useSearchParams();

  const userId = searchParams.get('id');

  if (!userId) notFound();

  const data = useProfileByRole({ userId });

  if (!data.data?.profile) notFound();

  const handleUpdateProfile = async (dto: UpdateProfileInput) => {
    await updateProfile({
      dto,
      userId,
    });
  };

  return (
    <div
      className={`
      ${styles.page}
      bg-gradient-to-b
      from-primary
      to-secondary
      dark:from-primary-dark
      dark:to-secondary-dark
      `}
    >
      <UserContent />
      <ContactsForm
        role={Role[data.data?.currentRole || 'USER']}
        profile={{ ...data, data: data.data?.profile }}
        updateProfile={handleUpdateProfile}
      />
      <AboutForm
        role={Role[data.data?.currentRole || 'USER']}
        profile={{ ...data, data: data.data?.profile }}
        updateProfile={handleUpdateProfile}
      />
    </div>
  );
}
