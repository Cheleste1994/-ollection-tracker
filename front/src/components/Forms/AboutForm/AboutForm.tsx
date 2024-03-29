'use client';

import TitleControl from '@/components/TitleControl/TitleControl';
import {
  UseProfileByTokenType,
} from '@/hooks/useProfileByToken';
import { InputsContacts, UpdateProfileInput } from '@/types/profile';
import { Role } from '@/types/user';
import { Textarea } from '@nextui-org/react';
import { BookOpen } from 'lucide-react';
import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { toast } from 'sonner';

import styles from './AboutForm.module.scss';

type AboutFormProps = {
  role: Role;
  profile: UseProfileByTokenType;
  updateProfile: (dto: UpdateProfileInput) => Promise<void>;
};

export default function AboutForm(props: AboutFormProps) {
  const {
    role,
    profile: { data, refetch },
    updateProfile,
  } = props;

  const isAuth = role === 'ADMIN' || role === 'AUTH';

  const { handleSubmit, control } = useForm<InputsContacts>({
    mode: 'onChange',
    disabled: !isAuth,
  });

  const [isOpenUpdate, setIsOpenUpdate] = useState(false);

  const onSubmit: SubmitHandler<InputsContacts> = async (data) => {
    await updateProfile({ about: data.about });
    await refetch();
    toast.success('Updated');
  };

  return (
    <div className={`${styles.about} bg-bg dark:bg-slate-900`}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <TitleControl
          title={isAuth ? 'About Me' : `About ${data?.firstName}`}
          isOpenUpdate={isOpenUpdate}
          setIsOpenUpdate={setIsOpenUpdate}
          isAuth={isAuth}
        />

        <BookOpen size={100} strokeWidth={0.2} />
        {isOpenUpdate ? (
          <Controller
            defaultValue={data?.about ? data.about : ''}
            name="about"
            control={control}
            render={({ field }) => (
              <Textarea
                variant="bordered"
                placeholder="Enter your description"
                disableAnimation
                disableAutosize
                className={styles.text}
                classNames={{
                  input: 'resize-y min-h-[40px]',
                }}
                {...field}
              />
            )}
          />
        ) : (
          <span className={styles.text}>
            {data?.about
              ? data.about
              : 'Share interesting life stories, or just tell us about yourself'}
          </span>
        )}
      </form>
    </div>
  );
}
