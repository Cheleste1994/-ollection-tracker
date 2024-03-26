'use client';

import { COLORS } from '@/constants/colors.constants';
import { capitalize } from '@/utils/capitalize';
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react';
import { PanelLeftOpen, PanelRightOpen } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import styles from './NavbarMenu.module.scss';

type PropsPage = {
  isOpenNavbarMenu: boolean;
  setIsOpenNavbarMenu: Dispatch<SetStateAction<boolean>>;
  children?: React.ReactNode;
};

export default function NavbarMenu(props: PropsPage) {
  const { isOpenNavbarMenu, setIsOpenNavbarMenu, children } = props;

  const pathName = usePathname();

  const navigate = useRouter();

  const handleCLick = (isOpen: boolean) => {
    setIsOpenNavbarMenu(isOpen);
    localStorage.setItem('isOpenNavbarMenu', isOpen ? 'true' : '');
  };

  const pathArr = pathName.split('/');

  return (
    <>
      <div className={`${styles.navbar} ${isOpenNavbarMenu && styles.active}`}>
        <div className={styles.title}>
          <Breadcrumbs
            maxItems={4}
            itemsBeforeCollapse={1}
            itemsAfterCollapse={2}
          >
            {pathArr.map((name, index) => (
              <BreadcrumbItem
                onPress={() =>
                  navigate.push(pathArr.slice(0, index + 1).join('/') || '/')
                }
                key={name || 'Home'}
              >
                {(name.includes('@') && name) || capitalize(name) || 'Home'}
              </BreadcrumbItem>
            ))}
          </Breadcrumbs>
          <PanelRightOpen
            color={COLORS.primary.DEFAULT}
            className="cursor-pointer"
            onClick={() => handleCLick(false)}
          />
        </div>
        {children && <div className={styles.content}>{children}</div>}
      </div>
      {!isOpenNavbarMenu && (
        <PanelLeftOpen
          color={COLORS.secondary.DEFAULT}
          className={styles.panelLeft}
          onClick={() => handleCLick(true)}
        />
      )}
    </>
  );
}
