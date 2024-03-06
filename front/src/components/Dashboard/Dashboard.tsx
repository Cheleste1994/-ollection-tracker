'use client';

import { LayoutGrid, Library, Settings } from 'lucide-react';
import Link from 'next/link';
import styles from './Dashboard.module.scss';
import { usePathname } from 'next/navigation';
import Title from '../Title/title';
import { Tooltip } from '@nextui-org/react';

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

  return (
    <div className={styles.dashboard}>
      <Title />

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
              href={href}
              className={`${styles.link} ${pathName === href && styles.activeLink}`}
            >
              <Icon
                className={`${styles.icon} ${pathName === href && styles.activeIcon}`}
                color="white"
              />
            </Link>
          </Tooltip>
        ))}
      </nav>

      <div>Avatar</div>
    </div>
  );
}
