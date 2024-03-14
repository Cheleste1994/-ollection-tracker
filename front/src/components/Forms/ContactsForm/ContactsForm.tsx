'use client';

import { GET_COUNTRIES } from '@/api/query/countries';
import TitleControl from '@/components/TitleControl/TitleControl';
import { InputsContatcs } from '@/types/profile';
import { useQuery } from '@apollo/client';
import { Image, Input } from '@nextui-org/react';
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
  const { register, handleSubmit, control } = useForm<InputsContatcs>({
    mode: 'onChange',
  });

  const { data } = useQuery(GET_COUNTRIES, {
    ssr: false,
  });

  const [isOpenUpdate, setIsOpenUpdate] = useState(false);

  const memoCountries = useMemo(() => data, [data]);

  const onSubmit: SubmitHandler<InputsContatcs> = (data) => {
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
        <Image
          isBlurred
          width={240}
          height={240}
          src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
          alt="Avatar"
          className="max-h-[240px]"
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
