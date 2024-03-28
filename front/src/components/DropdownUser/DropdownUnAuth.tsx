import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
} from '@nextui-org/react';
import Link from 'next/link';

export default function DropdownUnAuth() {
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
            endContent={
              <select
                className="z-10 outline-none w-16 py-0.5 rounded-md text-tiny group-data-[hover=true]:border-default-500 border-small border-default-300 dark:border-default-200 bg-transparent text-default-500"
                id="theme"
                name="theme"
              >
                <option>System</option>
                <option>Light</option>
                <option>Dark</option>
              </select>
            }
          >
            Theme
          </DropdownItem>
        </DropdownSection>

        <DropdownItem key="LogIn" textValue="LogIn">
          <Link href="/auth">Log In</Link>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
