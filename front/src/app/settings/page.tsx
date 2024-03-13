'use client';

import { GET_COUNTRIES } from '@/api/query/countries';
import AutocompleteCountry from '@/components/AutocompleteCountry/AutocompleteCountry';
import { useQuery } from '@apollo/client';
import {
  Button,
  Input,
  Image,
  Autocomplete,
  AutocompleteItem,
  Spinner,
} from '@nextui-org/react';
import { useDeferredValue, useMemo } from 'react';
import styles from './page.module.scss';

export default function Settings() {
  const { data } = useQuery(GET_COUNTRIES, {
    fetchPolicy: 'network-only',
    ssr: false,
  });

  const memoCountries = useMemo(() => data, [data])

  const deferredCountries = useDeferredValue(memoCountries);

  return (
    <main className={styles.main}>
      <div className={styles.settings}>
        <div className={styles.contacts}>
          <div className={styles.title}>
            Контактная информация:
            <Button color="primary" variant="light">
              Изменить
            </Button>
          </div>
          <Image
            isBlurred
            width={240}
            height={240}
            src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
            alt="NextUI Album Cover"
            className="max-h-[240px]"
          />
          <div className={styles.form}>
            <Input type="text" variant="underlined" label="First Name" />
            <Input type="text" variant="underlined" label="Last Name" />
            <Input type="text" variant="underlined" label="Gender" />
            <AutocompleteCountry data={deferredCountries}/>
          </div>
        </div>
      </div>
    </main>
  );
}
