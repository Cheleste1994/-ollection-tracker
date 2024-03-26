'use client';

import { LayoutGrid, Library, Settings, Users } from 'lucide-react';
import Link from 'next/link';
import styles from './Dashboard.module.scss';
import { usePathname } from 'next/navigation';
import { Tooltip } from '@nextui-org/react';
import TitleHeader from '../TitleHeader/TitleHeader';
import { COLORS } from '@/constants/colors.constants';
import DropdownAuth from '../DropdownUser/DropdownAuth';
import DropdownUnAuth from '../DropdownUser/DropdownUnAuth';
import { useProfileByToken } from '@/hooks/useProfileByToken';
import { useLogout } from '@/hooks/useLogout';
import { DASHBOARD_PAGES } from '@/config/pages-url.config';
import { useFilesDownload } from '@/hooks/useFilesDownload';

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
    Icon: (props: PropsLink): JSX.Element => <Users {...props} />,
    href: DASHBOARD_PAGES.USERS,
    title: () => 'Users',
  },
  {
    Icon: (props: PropsLink): JSX.Element => <Settings {...props} />,
    href: DASHBOARD_PAGES.SETTINGS,
    title: (isLogin: boolean) => (isLogin ? 'Settings' : 'Log in to access'),
  },
];

export default function Dashboard() {
  const pathName = usePathname();
  const { data: profile } = useProfileByToken();
  const { urlBase64 } = useFilesDownload<string>(profile?.avatar);

  const { logout } = useLogout();

  return (
    <header
      className={`${styles.dashboard} bg-gradient-to-b from-primary to-secondary dark:from-primary-dark dark:to-secondary-dark`}
    >
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
                color={pathName === href ? COLORS.primary.DEFAULT : 'white'}
              />
            </Link>
          </Tooltip>
        ))}
      </nav>
      {profile ? (
        <DropdownAuth data={profile} logout={logout} avatar={urlBase64?.file} />
      ) : (
        <DropdownUnAuth />
      )}
    </header>
  );
}
