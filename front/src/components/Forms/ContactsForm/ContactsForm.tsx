'use client';

import { GET_COUNTRIES } from '@/api/query/countries';
import { ProfileResQuery } from '@/api/query/profile';
import TitleControl from '@/components/TitleControl/TitleControl';
import { useUpdateProfile } from '@/hooks/useUpdateProfile';
import { InputsContacts } from '@/types/profile';
import { useQuery } from '@apollo/client';
import { Avatar, Input } from '@nextui-org/react';
import { User } from 'lucide-react';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { toast } from 'sonner';
import AutocompleteCountry from '../../AutocompleteCountry/AutocompleteCountry';

import styles from './ContactsForm.module.scss';

enum InputsEnum {
  firstName = 'First Name',
  lastName = 'Last Name',
  gender = 'Gender',
}

export default function ContactsForm() {
  const { handleSubmit, control } = useForm<InputsContacts>({
    mode: 'onChange',
  });

  const { data: countries } = useQuery(GET_COUNTRIES, {
    ssr: false,
  });

  const [isOpenUpdate, setIsOpenUpdate] = useState(false);

  const { updateProfile, data: profile } = useUpdateProfile();

  const memoCountries = useMemo(() => countries, [countries]);

  const memoProfile = useMemo(() => profile, [profile]);

  const onSubmit: SubmitHandler<InputsContacts> = async (data) => {
    await updateProfile({ ...data, countryId: data.countryId || null });
    toast.success('Contacts updated')
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
          showFallback
          src="https://images.unsplash.com/broken"
          fallback={<User className="w-40 h-40 text-default-500" />}
          className={'w-[240px] h-[240px] cursor-pointer'}
          classNames={{
            base: 'bg-gradient-to-br from-primary to-secondary',
            icon: 'text-black/80',
          }}
        />
        <div className={styles.form}>
          {memoProfile &&
            (Object.keys(InputsEnum) as (keyof typeof InputsEnum)[]).map(
              (value) => {
                return (
                  <Controller
                    key={value}
                    defaultValue={memoProfile?.[value] || ''}
                    name={value}
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="text"
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

          {memoProfile && memoCountries && (
            <AutocompleteCountry
              countryId={memoProfile?.countryId}
              data={memoCountries}
              control={control}
              disabled={!isOpenUpdate}
            />
          )}
        </div>
      </form>
    </div>
  );
}
