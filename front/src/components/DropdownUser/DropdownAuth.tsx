import { ProfileRes } from '@/api/query/profile';
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
  Spinner,
} from '@nextui-org/react';
import { PlusIcon } from 'lucide-react';

type DropdownAuthProps = {
  data: ProfileRes;
  logout: () => void;
};

export default function DropdownAuth(props: DropdownAuthProps) {
  const {
    data: { firstName, lastName },
    logout,
  } = props;

  const profile = {
    userName: `${firstName || ''} ${lastName || ''}`,
    avatar: 'https://i.pravatar.cc/150?u=a04258114e29026708c',
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
          <DropdownItem key="dashboard">Dashboard</DropdownItem>
          <DropdownItem key="settings">Settings</DropdownItem>
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
            endContent={
              <select
                className="z-10 outline-none w-16 py-0.5 rounded-md text-tiny group-data-[hover=true]:border-default-500 border-small border-default-300 dark:border-default-200 bg-transparent text-default-500"
                id="theme"
                name="theme"
              >
                <option>System</option>
                <option>Dark</option>
                <option>Light</option>
              </select>
            }
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
