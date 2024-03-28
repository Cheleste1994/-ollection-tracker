'use client';

import { GET_ALL_PROFILES } from '@/api/query/profiles';
import NavbarMenu from '@/components/NavbarMenu/NavbarMenu';
import { useQuery } from '@apollo/client';
import { Input, Listbox, ListboxItem } from '@nextui-org/react';
import { SearchIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import {
  SetStateAction,
  useCallback,
  useDeferredValue,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import styles from './page.module.scss';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpenNavbarMenu, setIsOpenNavbarMenu] = useState(false);

  const [filterValue, setFilterValue] = useState('');

  const navigate = useRouter();

  const { data } = useQuery(GET_ALL_PROFILES, {
    ssr: false,
  });

  useLayoutEffect(() => {
    setIsOpenNavbarMenu(Boolean(localStorage.getItem('isOpenNavbarMenu')));
  }, []);

  const onSearchChange = useCallback((value: SetStateAction<string>) => {
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue('');
    }
  }, []);

  const profiles = useMemo(
    () =>
      data?.profiles.map(({ firstName, lastName, ...profile }) => ({
        ...profile,
        name: `${firstName} ${lastName}`,
      })) || [],
    [data]
  );

  const filterProfile = useMemo(
    () =>
      profiles.filter((user) =>
        user.email.toLowerCase().includes(filterValue.toLowerCase())
      ),
    [filterValue, profiles]
  );

  const profilesDeferred = useDeferredValue(filterProfile);

  const handleClickNavigate = (userId: string, email: string) => {
    navigate.push(`/users/${email}?id=${userId}`);
  };

  return (
    <main className={`${styles.main} ${isOpenNavbarMenu && styles.active}`}>
      <NavbarMenu
        isOpenNavbarMenu={isOpenNavbarMenu}
        setIsOpenNavbarMenu={setIsOpenNavbarMenu}
      >
        <Input
          isClearable
          classNames={{
            base: 'w-full',
            inputWrapper: 'border-1',
          }}
          placeholder="Search by email..."
          size="sm"
          startContent={<SearchIcon className="text-default-300" />}
          value={filterValue}
          variant="bordered"
          onClear={() => setFilterValue('')}
          onValueChange={onSearchChange}
        />
        <Listbox
          aria-label="listbox"
          items={profilesDeferred}
          className="overflow-auto"
        >
          {({ email, name, userId }) => (
            <ListboxItem
              key={userId}
              textValue={name}
              onClick={() => handleClickNavigate(userId, email)}
            >
              <div className="flex gap-2 items-center">
                <div className="flex flex-col">
                  <span className="text-small">{name}</span>
                  <span className="text-tiny text-default-400">{email}</span>
                </div>
              </div>
            </ListboxItem>
          )}
        </Listbox>
      </NavbarMenu>
      {children}
    </main>
  );
}
