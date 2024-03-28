'use client';

import { ProfileResQuery } from '@/api/query/profile';
import { DASHBOARD_PAGES } from '@/config/pages-url.config';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  User,
  Avatar,
  Button,
  Link,
} from '@nextui-org/react';
import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import SelectTheme from '../Select/SelectTheme/SelectTheme';

type DropdownAuthProps = {
  data: ProfileResQuery;
  logout: () => void;
  avatar?: string;
};

export default function DropdownAuth(props: DropdownAuthProps) {
  const navigate = useRouter();

  const {
    data: { firstName, lastName },
    logout,
    avatar,
  } = props;

  const profile = {
    userName: `${firstName || ''} ${lastName || ''}`,
    avatar,
    network: {
      platform: '@jrgarciadev',
      link: 'https://twitter.com/jrgarciadev',
    },
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly variant="bordered" className="rounded-full">
          <Avatar
            isBordered
            color="secondary"
            size="md"
            name="A"
            src={profile.avatar}
          />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Link Actions">
        <DropdownSection aria-label="Profile & Actions" showDivider>
          <DropdownItem
            key="user-name"
            textValue="user-name"
            isReadOnly
            className="h-14 gap-2 opacity-100"
          >
            <User
              name={profile.userName}
              description={
                <Link href={profile.network.link} size="sm" isExternal>
                  {profile.network.platform}
                </Link>
              }
              avatarProps={{
                src: profile.avatar,
              }}
            />
          </DropdownItem>
          <DropdownItem
            key="dashboard"
            onClick={() => navigate.push(DASHBOARD_PAGES.HOME)}
          >
            Dashboard
          </DropdownItem>
          <DropdownItem
            key="settings"
            onClick={() => navigate.push(DASHBOARD_PAGES.SETTINGS)}
          >
            Settings
          </DropdownItem>
          <DropdownItem
            key="new_project"
            endContent={<PlusIcon className="text-large" />}
          >
            New Project
          </DropdownItem>
        </DropdownSection>

        <DropdownSection aria-label="Preferences" showDivider>
          <DropdownItem key="quick_search" shortcut="⌘K">
            Quick search
          </DropdownItem>
          <DropdownItem
            isReadOnly
            key="theme"
            className="cursor-default"
            endContent={<SelectTheme />}
          >
            Theme
          </DropdownItem>
        </DropdownSection>

        <DropdownSection aria-label="Help & Feedback">
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem key="logout" onClick={logout}>
            Log Out
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
