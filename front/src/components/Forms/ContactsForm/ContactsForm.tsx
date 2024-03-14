'use client';

import { GET_COUNTRIES } from '@/api/query/countries';
import TitleControl from '@/components/TitleControl/TitleControl';
import { InputsContacts } from '@/types/profile';
import { useQuery } from '@apollo/client';
import { Avatar, Input } from '@nextui-org/react';
import { User } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import AutocompleteCountry from '../../AutocompleteCountry/AutocompleteCountry';

import styles from './ContactsForm.module.scss';

enum InputsEnum {
  firstName = 'First Name',
  lastName = 'Last Name',
  gender = 'Gender',
}

export default function ContactsForm() {
  const { register, handleSubmit, control } = useForm<InputsContacts>({
    mode: 'onChange',
  });

  const { data } = useQuery(GET_COUNTRIES, {
    ssr: false,
  });

  const [isOpenUpdate, setIsOpenUpdate] = useState(false);

  const memoCountries = useMemo(() => data, [data]);

  const onSubmit: SubmitHandler<InputsContacts> = (data) => {
    console.log(data);
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
          fallback={
            <User
              className="w-40 h-40 text-default-500"
            />
          }
          className={'w-[240px] h-[240px] cursor-pointer'}
          classNames={{
            base: 'bg-gradient-to-br from-primary to-secondary',
            icon: 'text-black/80',
          }}
        />
        <div className={styles.form}>
          {(Object.keys(InputsEnum) as (keyof typeof InputsEnum)[]).map(
            (value) => (
              <Controller
                key={value}
                defaultValue=""
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
            )
          )}
          <AutocompleteCountry
            data={memoCountries}
            register={register('country')}
          />
        </div>
      </form>
    </div>
  );
}
