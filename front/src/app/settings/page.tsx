'use client';

import AboutForm from '@/components/Forms/AboutForm/AboutForm';
import ContactsForm from '@/components/Forms/ContactsForm/ContactsForm';
import { useProfileByToken } from '@/hooks/useProfileByToken';
import { useUpdateProfileByToken } from '@/hooks/useUpdateProfileByToken';
import { Role } from '@/types/user';
import styles from './page.module.scss';

export default function Settings() {
  const profile = useProfileByToken();
  const { updateProfile } = useUpdateProfileByToken();

  return (
    <main
      className={`${styles.main} bg-gradient-to-b from-primary to-secondary dark:from-primary-dark dark:to-secondary-dark`}
    >
      <div className={styles.settings}>
        <ContactsForm
          role={Role.AUTH}
          profile={profile}
          updateProfile={updateProfile}
        />
        <AboutForm
          role={Role.AUTH}
          profile={profile}
          updateProfile={updateProfile}
        />
      </div>
    </main>
  );
}
