'use client';

import { LayoutGrid, Library, Settings } from 'lucide-react';
import Link from 'next/link';
import styles from './Dashboard.module.scss';
import { usePathname } from 'next/navigation';
import { Spinner, Tooltip } from '@nextui-org/react';
import TitleHeader from '../TitleHeader/TitleHeader';
import { COLORS } from '@/constants/colors.constants';
import DropdownAuth from '../DropdownUser/DropdownAuth';
import { useEffect, useState } from 'react';
import DropdownUnAuth from '../DropdownUser/DropdownUnAuth';
import { ProfileRes } from '@/api/query/profile';
import { useProfile } from '@/hooks/useProfile';
import { useLogout } from '@/hooks/useLogout';
import { DASHBOARD_PAGES } from '@/config/pages-url.config';

type PropsLink = {
  color?: string;
  className?: string;
};

const navLinks = [
  {
    Icon: (props: PropsLink): JSX.Element => <LayoutGrid {...props} />,
    href: DASHBOARD_PAGES.HOME,
    title: () => 'Home',
  },
  {
    Icon: (props: PropsLink): JSX.Element => <Library {...props} />,
    href: DASHBOARD_PAGES.COLLECTIONS,
    title: () => 'Collections',
  },
  {
    Icon: (props: PropsLink): JSX.Element => <Settings {...props} />,
    href: DASHBOARD_PAGES.SETTINGS,
    title: (isLogin: boolean) => isLogin ? 'Settings' : 'Log in to access',
  },
];

export default function Dashboard() {
  const pathName = usePathname();
  const [profile, setProfile] = useState<ProfileRes | undefined>();
  const { data } = useProfile();

  const { logout } = useLogout();

  useEffect(() => {
    if (data && !profile) {
      return setProfile(data);
    }
    if (!data && profile) {
      return setProfile(undefined);
    }
  });

  return (
    <header className={styles.dashboard}>
      <TitleHeader />

      <nav className={styles.nav}>
        {navLinks.map(({ href, Icon, title }) => (
          <Tooltip
            placement="right-start"
            content={title(Boolean(profile))}
            color="secondary"
            key={href}
            className="select-none"
          >
            <Link
              prefetch={false}
              href={href}
              className={`${styles.link} ${pathName === href && styles.activeLink}`}
            >
              <Icon
                className={`${styles.icon} ${pathName === href && styles.activeIcon}`}
                color={pathName === href ? COLORS.primary : 'white'}
              />
            </Link>
          </Tooltip>
        ))}
      </nav>
      {profile ? (
        <DropdownAuth data={profile} logout={logout} />
      ) : (
        <DropdownUnAuth />
      )}
    </header>
  );
}
