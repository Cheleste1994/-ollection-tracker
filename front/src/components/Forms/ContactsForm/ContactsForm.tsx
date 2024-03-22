'use client';

import { UPLOAD_FILE } from '@/api/mutation/upload';
import { GET_COUNTRIES } from '@/api/query/countries';
import InputUpload from '@/components/InputUpload/InputUpload';
import TitleControl from '@/components/TitleControl/TitleControl';
import { useFileDownload } from '@/hooks/useFileDownload';
import { useUpdateProfile } from '@/hooks/useUpdateProfile';
import { InputsContacts } from '@/types/profile';
import { useMutation, useQuery } from '@apollo/client';
import { Avatar, Input, Spinner } from '@nextui-org/react';
import { User } from 'lucide-react';
import { ChangeEvent, useMemo, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { toast } from 'sonner';
import AutocompleteCountry from '../../AutocompleteCountry/AutocompleteCountry';

import styles from './ContactsForm.module.scss';

enum InputsEnum {
  firstName = 'First Name',
  lastName = 'Last Name',
  gender = 'Gender',
  age = 'Age',
}

export default function ContactsForm() {
  const { handleSubmit, control } = useForm<InputsContacts>({
    mode: 'onChange',
  });

  const { data: countries, loading } = useQuery(GET_COUNTRIES, {
    ssr: false,
  });

  const [uploadAvatar] = useMutation(UPLOAD_FILE);

  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isClickUpload, setIsClickUpload] = useState(false);
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(false);

  const { updateProfile, data: profile } = useUpdateProfile();

  const {
    urlBase64,
    refetch,
    loading: avatarIsLoading,
  } = useFileDownload(profile?.avatar);

  const memoCountries = useMemo(() => countries, [countries]);

  const memoProfile = useMemo(() => profile, [profile]);

  const onSubmit: SubmitHandler<InputsContacts> = async (data) => {
    await updateProfile({ ...data, countryId: data.countryId, age: +data.age });
    toast.success('Contacts updated');
  };

  const handleInputUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoadingAvatar(() => true);
    const { validity, files } = e.target;

    if (validity.valid && files) {
      const { data } = await uploadAvatar({
        variables: {
          file: files[0],
        },
      });
      if (data) {
        await refetch(data.uploadAvatar.avatar);
        toast.success('Avatar updated');
      }
    }
    setIsLoadingAvatar(() => false);
  };

  return (
    <div>
      <form className={styles.contacts} onSubmit={handleSubmit(onSubmit)}>
        <TitleControl
          title="Contacts"
          isOpenUpdate={isOpenUpdate}
          setIsOpenUpdate={setIsOpenUpdate}
        />
        <Avatar
          src={avatarIsLoading || isLoadingAvatar ? '' : urlBase64}
          fallback={
            avatarIsLoading || isLoadingAvatar ? (
              <Spinner size="lg" />
            ) : (
              <User className="w-40 h-40 text-default-500" />
            )
          }
          className={'w-[240px] h-[240px] cursor-pointer'}
          classNames={{
            base: 'bg-gradient-to-br from-primary to-secondary',
            icon: 'text-black/80',
          }}
          onClick={() => setIsClickUpload(true)}
        />
        <div className={styles.form}>
          {memoProfile &&
            (Object.keys(InputsEnum) as (keyof typeof InputsEnum)[]).map(
              (value) => {
                return (
                  <Controller
                    key={value}
                    defaultValue={String(memoProfile?.[value]) || ''}
                    name={value}
                    control={control}
                    render={({ field }) => (
                      <Input
                        type={field.name === 'age' ? 'number' : 'text'}
                        variant={isOpenUpdate ? 'faded' : 'underlined'}
                        label={InputsEnum[value]}
                        disabled={!isOpenUpdate}
                        {...field}
                      />
                    )}
                  />
                );
              }
            )}

          {memoProfile && (
            <AutocompleteCountry
              countryId={memoProfile?.countryId}
              data={memoCountries}
              control={control}
              disabled={!isOpenUpdate}
              isLoading={loading}
            />
          )}
        </div>
      </form>
      <InputUpload
        isClick={isClickUpload}
        setIsClickUpload={setIsClickUpload}
        handleInputUpload={handleInputUpload}
      />
    </div>
  );
}
