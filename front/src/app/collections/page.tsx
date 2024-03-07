'use client';

import NavbarMenu from '@/components/NavbarMenu/NavbarMenu';
import TableItems from '@/components/Table/Table';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './page.module.scss';

export default function page() {
  const [isOpenNavbarMenu, setIsOpenNavbarMenu] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    setIsOpenNavbarMenu(true)
  }, [])

  return (
    <main className={`${styles.main} ${isOpenNavbarMenu && styles.active}`}>
      <NavbarMenu
        isOpenNavbarMenu={isOpenNavbarMenu}
        setIsOpenNavbarMenu={setIsOpenNavbarMenu}
        pathName={pathName}
      />
      <TableItems />
    </main>
  );
}
