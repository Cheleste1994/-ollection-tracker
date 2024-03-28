'use client';

import { DASHBOARD_PAGES } from '@/config/pages-url.config';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
} from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SelectTheme from '../Select/SelectTheme/SelectTheme';

export default function DropdownUnAuth() {
  const navigate = useRouter();

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly variant="bordered" className="rounded-full">
          A
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Link Actions">
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

        <DropdownItem
          key="LogIn"
          textValue="LogIn"
          onPress={() => navigate.push(DASHBOARD_PAGES.AUTH)}
        >
          Log In
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
