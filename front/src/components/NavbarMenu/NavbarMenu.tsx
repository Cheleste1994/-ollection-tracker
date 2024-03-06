'use client';

import { COLORS } from '@/constants/colors.constants';
import { PanelLeftOpen, PanelRightOpen } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import styles from './NavbarMenu.module.scss';

export default function NavbarMenu() {
  const [isOpen, setIsOpen] = useState(true);
  const pathName = usePathname();

  return (
    <>
      <div className={`${styles.navbar} ${!isOpen && styles.active}`}>
        <div className={styles.title}>
          <h2>
            {pathName.length > 1
              ? pathName[1].toUpperCase() + pathName.slice(2)
              : 'Menu'}
          </h2>
          <PanelRightOpen
            color={COLORS.primary}
            className="cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        </div>
      </div>
      {!isOpen && (
        <PanelLeftOpen
          color={COLORS.primary}
          className={styles.panelLeft}
          onClick={() => setIsOpen(true)}
        />
      )}
    </>
  );
}
