import { COLORS } from '@/constants/colors.constants';
import { PanelLeftOpen, PanelRightOpen } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import styles from './NavbarMenu.module.scss';

type PropsPage = {
  isOpenNavbarMenu: boolean;
  setIsOpenNavbarMenu: Dispatch<SetStateAction<boolean>>;
  pathName: string;
};

export default function NavbarMenu(props: PropsPage) {
  const { isOpenNavbarMenu, pathName, setIsOpenNavbarMenu } = props;
  return (
    <>
      <div className={`${styles.navbar} ${!isOpenNavbarMenu && styles.active}`}>
        <div className={styles.title}>
          <h2>
            {pathName.length > 1
              ? pathName[1].toUpperCase() + pathName.slice(2)
              : 'Menu'}
          </h2>
          <PanelRightOpen
            color={COLORS.primary}
            className="cursor-pointer"
            onClick={() => setIsOpenNavbarMenu(false)}
          />
        </div>
      </div>
      {!isOpenNavbarMenu && (
        <PanelLeftOpen
          color={COLORS.primary}
          className={styles.panelLeft}
          onClick={() => setIsOpenNavbarMenu(true)}
        />
      )}
    </>
  );
}
