'use client';

import { LayoutGrid, Library, Settings } from 'lucide-react';
import Link from 'next/link';
import styles from './Dashboard.module.scss';
import { usePathname } from 'next/navigation';
import { Tooltip } from '@nextui-org/react';
import TitleHeader from '../TitleHeader/TitleHeader';
import { COLORS } from '@/constants/colors.constants';
import DropdownAuth from '../DropdownUser/DropdownAuth';
import { useState } from 'react';
import DropdownUnAuth from '../DropdownUser/DropdownUnAuth';

type PropsLink = {
  color?: string;
  className?: string;
};

const navLinks = [
  {
    Icon: (props: PropsLink): JSX.Element => <LayoutGrid {...props} />,
    href: '/',
    title: 'Home',
  },
  {
    Icon: (props: PropsLink): JSX.Element => <Library {...props} />,
    href: '/collections',
    title: 'Collections',
  },
  {
    Icon: (props: PropsLink): JSX.Element => <Settings {...props} />,
    href: '/settings',
    title: 'Settings',
  },
];

export default function Dashboard() {
  const pathName = usePathname();
  const [isAuth, setIsAuth] = useState(false);

  return (
    <header className={styles.dashboard}>
      <TitleHeader />

      <nav className={styles.nav}>
        {navLinks.map(({ href, Icon, title }) => (
          <Tooltip
            placement="right-start"
            content={title}
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
      {isAuth ? <DropdownAuth /> : <DropdownUnAuth />}
    </header>
  );
}
