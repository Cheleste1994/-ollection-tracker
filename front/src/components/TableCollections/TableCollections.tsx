'use client';

import { ItemRes } from '@/api/query/item';
import { VerticalDotsIcon } from '@/common/verticalDotsIcons';
import { DASHBOARD_PAGES } from '@/config/pages-url.config';
import { useFilesDownload } from '@/hooks/useFilesDownload';
import { FileDownload } from '@/types/files';
import { StatusItem } from '@/types/items';
import {  Status } from '@/types/user';
import { capitalize } from '@/utils/capitalize';
import { ApolloQueryResult } from '@apollo/client';
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
  useLayoutEffect,
} from 'react';
import SelectOptionsItem from '../Select/SelectOptions/SelectOptionsItem';
import {
  columns,
  COLUMNS_UID_ITEMS,
  INITIAL_VISIBLE_COLUMNS,
  statusOptionsItem,
} from './config';

interface SortDescriptor extends SortDescriptorUI {
  column: COLUMNS_UID_ITEMS;
  direction: 'ascending' | 'descending';
}

export type ItemType = Omit<ItemRes, 'tags'>;

type TableItemProps = {
  deleteItem: (itemId: string) => Promise<void>;
  onOpenModalAddItem: () => void;
  itemsState: ItemRes[] | undefined;
  refetchItems: (
    variables?:
      | Partial<{
          [key: string]: any;
        }>
      | undefined
  ) => Promise<
    ApolloQueryResult<{
      userItems: ItemRes[];
    }>
  >;
};

export default function TableCollections({
  deleteItem,
  onOpenModalAddItem,
  itemsState,
  refetchItems,
}: TableItemProps) {
  const navigate = useRouter();
  const { urlBase64, refetch } = useFilesDownload<string[]>();

  const images = useMemo(() => {
    return itemsState?.reduce<{
      [key: string]: FileDownload | undefined;
    }>(
      (acc, { image }) => ({
        ...acc,
        [image]: urlBase64?.find(({ id }) => image === id),
      }),
      {}
    );
  }, [itemsState, urlBase64]);

  useLayoutEffect(() => {
    if (itemsState) {
      refetch(
        itemsState.filter(({ image }) => image).map(({ image }) => image)
      );
    }
  }, [itemsState, refetch]);

  const [filterValue, setFilterValue] = useState('');
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [selectedStatus, setSelectedStatus] = useState<Map<string, ItemType>>(
    new Map()
  );

  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    INITIAL_VISIBLE_COLUMNS
  );

  const [statusFilter, setStatusFilter] = useState<Selection>('all');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: COLUMNS_UID_ITEMS.name,
    direction: 'ascending',
  });

  const [page, setPage] = useState(1);

  const pages = Math.ceil((itemsState?.length || 0) / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredUsers: ItemType[] = itemsState ? [...itemsState] : [];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== 'all' &&
      Array.from(statusFilter).length !== Object.values(Status).length
    ) {
      filteredUsers = filteredUsers.filter(({ status }) =>
        Array.from(statusFilter).includes(status)
      );
    }

    return filteredUsers;
  }, [itemsState, filterValue, statusFilter, deleteItem, selectedStatus, hasSearchFilter]);

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
  }, [sortDescriptor, items, urlBase64]);

  const renderCell = useCallback(
    (item: ItemType, columnKey: string | number) => {
      switch (columnKey) {
        case 'id':
          return <div>{item.category.name}</div>;
        case 'name':
          return (
            <User
              avatarProps={{
                radius: 'full',
                size: 'sm',
                src: images?.[`${item?.image}`]?.file || '',
              }}
              classNames={{
                description: 'text-default-500',
              }}
              description={item.description}
              name={item.name}
            >
              {item.name}
            </User>
          );
        case 'category':
          return <div>{item.category.name}</div>;
        case 'status':
          return (
            <SelectOptionsItem
              options={statusOptionsItem}
              item={item}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
            />
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
                      navigate.push(`${DASHBOARD_PAGES.USERS}/${item.id}`);
                    }}
                  >
                    View
                  </DropdownItem>
                  <DropdownItem
                    color={selectedStatus.has(item.id) ? 'primary' : 'default'}
                    onClick={async () => {
                      setSelectedStatus((state) => {
                        const nextState = new Map(state);
                        if (nextState.has(item.id)) {
                          nextState.delete(item.id);
                        } else {
                          nextState.set(item.id, item);
                        }
                        return nextState;
                      });
                    }}
                  >
                    {selectedStatus.has(item.id) ? 'Save' : 'Edit'}
                  </DropdownItem>
                  <DropdownItem
                    onClick={async () => {
                      await deleteItem(item.id);
                    }}
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return;
      }
    },
    [deleteItem, selectedStatus, urlBase64, images, navigate]
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
                {Object.values(StatusItem).map((status) => (
                  <DropdownItem
                    key={status}
                    className="capitalize"
                    aria-label={capitalize(status)}
                  >
                    {capitalize(status)}
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
              className={`bg-foreground text-background`}
              endContent={<PlusIcon />}
              size="sm"
              onPress={() => onOpenModalAddItem()}
            >
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {items.length} item
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
    onOpenModalAddItem
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
            align={
              column.uid === 'actions' || column.uid === 'status'
                ? 'center'
                : 'start'
            }
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={'No items found'} items={sortedItems}>
        {(item) => {
          return (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell key={columnKey}>
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          );
        }}
      </TableBody>
    </Table>
  );
}
