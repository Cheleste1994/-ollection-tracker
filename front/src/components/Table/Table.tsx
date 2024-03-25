'use client';

import { GET_PROFILES, ProfileWithUserRes } from '@/api/query/profiles';
import { useFilesDownload } from '@/hooks/useFilesDownload';
import { FileDownload } from '@/types/files';
import { UpdateProfileInput } from '@/types/profile';
import { Role, Status as statusColorMap } from '@/types/user';
import { capitalize } from '@/utils/capitalize';
import { useQuery } from '@apollo/client';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Selection,
  TableCell,
  SortDescriptor as SortDescriptorUI,
} from '@nextui-org/react';
import { SearchIcon, ChevronDownIcon, PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  useState,
  useMemo,
  useCallback,
  SetStateAction,
  ChangeEvent,
  useEffect,
  useLayoutEffect,
} from 'react';
import {
  columns,
  statusOptions,
  COLUMNS_UID,
  INITIAL_VISIBLE_COLUMNS,
} from './config';
import { VerticalDotsIcon } from './verticalDotsIcons';

type UserType = Omit<ProfileWithUserRes, 'firstName' | 'lastName'> & {
  name: string;
};

interface SortDescriptor extends SortDescriptorUI {
  column: COLUMNS_UID;
  direction: 'ascending' | 'descending';
}

type TableItemProps = {
  role: Role;
  deleteUser: (userId: string) => Promise<void>;
  onOpenModalRegistration: () => void
};

export default function TableItem({ role, deleteUser, onOpenModalRegistration }: TableItemProps) {
  const { data: users, refetch: refetchProfiles } = useQuery(GET_PROFILES, {
    fetchPolicy: 'network-only',
    ssr: false,
    pollInterval: 1000
  });

  const navigate = useRouter();
  const { urlBase64, refetch } = useFilesDownload<string[]>();

  const avatars = useMemo(() => {
    return users?.profiles.reduce<{ [key: string]: FileDownload | undefined }>(
      (acc, { avatar }) => ({
        ...acc,
        [avatar]: urlBase64?.find(({ id }) => avatar === id),
      }),
      {}
    );
  }, [users, urlBase64]);

  useLayoutEffect(() => {
    if (users?.profiles) {
      refetch(
        users.profiles
          .filter(({ avatar }) => avatar)
          .map(({ avatar }) => avatar)
      );
    }
  }, [users]);

  const [filterValue, setFilterValue] = useState('');
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    INITIAL_VISIBLE_COLUMNS
  );

  const [statusFilter, setStatusFilter] = useState<Selection>('all');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: COLUMNS_UID.age,
    direction: 'ascending',
  });

  const [page, setPage] = useState(1);

  const pages = Math.ceil((users?.profiles.length || 0) / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredUsers: UserType[] = users
      ? users.profiles.map(({ firstName, lastName, ...profile }) => ({
          ...profile,
          name: `${firstName} ${lastName}`,
        }))
      : [];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== 'all' &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter(({ status }) =>
        Array.from(statusFilter).includes(status)
      );
    }

    return filteredUsers;
  }, [users, filterValue, statusFilter, avatars, deleteUser]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction !== 'ascending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback(
    (profile: UserType, columnKey: string | number) => {
      const profileValue = profile[`${columnKey as keyof UserType}`];

      switch (columnKey) {
        case 'name':
          return (
            <User
              avatarProps={{
                radius: 'full',
                size: 'sm',
                src: avatars?.[`${profile?.avatar}`]?.file || '',
              }}
              classNames={{
                description: 'text-default-500',
              }}
              description={profile.email}
              name={profile.name}
            >
              {profile.email}
            </User>
          );
        case 'role':
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">
                {capitalize(profile.role)}
              </p>
            </div>
          );
        case 'status':
          return (
            <Chip
              className="capitalize border-none gap-1 text-default-600"
              color={statusColorMap[profile.status]}
              size="sm"
              variant="dot"
            >
              {capitalize(profile.status)}
            </Chip>
          );
        case 'actions':
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown className="bg-background border-1 border-default-200">
                <DropdownTrigger>
                  <Button isIconOnly radius="full" size="sm" variant="light">
                    <VerticalDotsIcon
                      className="text-default-400"
                      width={40}
                      height={40}
                    />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-labelledby="menu-label">
                  <DropdownItem
                    onClick={() => {
                      navigate.push(
                        `/users/${profile.email}?id=${profile.userId}`
                      );
                    }}
                  >
                    View
                  </DropdownItem>
                  <DropdownItem
                    className={`${Role[role] === 'USER' ? 'opacity-50 cursor-no-drop' : 'opacity-100 cursor-pointer'}`}
                  >
                    Edit
                  </DropdownItem>
                  <DropdownItem
                    className={`${Role[role] === 'ADMIN' ? 'opacity-100 cursor-pointer' : 'opacity-50 cursor-no-drop'}`}
                    onClick={async () => {
                      await deleteUser(profile.userId);
                      await refetchProfiles();
                    }}
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return profileValue;
      }
    },
    [avatars, deleteUser]
  );

  const onRowsPerPageChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = useCallback((value: SetStateAction<string>) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: 'w-full sm:max-w-[44%]',
              inputWrapper: 'border-1',
            }}
            placeholder="Search by name..."
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue('')}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem
                    key={status.uid}
                    className="capitalize"
                    aria-label={status.name}
                  >
                    {status.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem
                    key={column.uid}
                    className="capitalize"
                    aria-label={column.name}
                  >
                    {column.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              className={`bg-foreground text-background ${Role[role] === 'USER' ? 'opacity-50 cursor-no-drop' : 'opacity-100 cursor-pointer'}`}
              endContent={<PlusIcon />}
              size="sm"
              disabled={Role[role] === 'USER'}
              onPress={() => Role[role] !== 'USER' && onOpenModalRegistration()}
            >
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {users?.profiles.length} users
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    items.length,
    hasSearchFilter,
    role
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: 'bg-foreground text-background',
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
        <span className="text-small text-default-400">
          {selectedKeys === 'all'
            ? 'All items selected'
            : `${selectedKeys.size} of ${items.length} selected`}
        </span>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const classNames = useMemo(
    () => ({
      wrapper: ['max-h-[382px]', 'max-w-3xl'],
      th: ['bg-transparent', 'text-default-500', 'border-b', 'border-divider'],
      td: [
        'group-data-[first=true]:first:before:rounded-none',
        'group-data-[first=true]:last:before:rounded-none',
        'group-data-[middle=true]:before:rounded-none',
        'group-data-[last=true]:first:before:rounded-none',
        'group-data-[last=true]:last:before:rounded-none',
      ],
    }),
    []
  );

  return (
    <Table
      isCompact
      removeWrapper
      aria-label="Table with custom cells, pagination and sorting"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      checkboxesProps={{
        classNames: {
          wrapper: 'after:bg-foreground after:text-background text-background',
        },
      }}
      classNames={classNames}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      fullWidth={true}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={(descriptor) =>
        setSortDescriptor(descriptor as SortDescriptor)
      }
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={'No users found'} items={sortedItems}>
        {(item) => (
          <TableRow key={item.userId}>
            {(columnKey) => (
              <TableCell key={columnKey}>
                {renderCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
