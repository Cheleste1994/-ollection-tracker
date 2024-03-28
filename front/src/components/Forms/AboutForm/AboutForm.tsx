'use client';

import TitleControl from '@/components/TitleControl/TitleControl';
import { useProfile } from '@/hooks/useProfile';
import { useUpdateProfile } from '@/hooks/useUpdateProfile';
import { InputsContacts } from '@/types/profile';
import { Textarea } from '@nextui-org/react';
import { BookOpen } from 'lucide-react';
import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { toast } from 'sonner';

import styles from './AboutForm.module.scss';

export default function AboutForm() {
  const { handleSubmit, control } = useForm<InputsContacts>({
    mode: 'onChange',
  });

  const { updateProfile, data } = useUpdateProfile();

  const [isOpenUpdate, setIsOpenUpdate] = useState(false);

  const onSubmit: SubmitHandler<InputsContacts> = async (data) => {
    await updateProfile({ about: data.about });
    toast.success('Updated');
  };

  return (
    <div className={styles.about}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <TitleControl
          title="About Me"
          isOpenUpdate={isOpenUpdate}
          setIsOpenUpdate={setIsOpenUpdate}
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
