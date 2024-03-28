// import { StatusItem } from '@/types/items'
// import { capitalize } from '@/utils/capitalize'
// import { Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem, Input } from '@nextui-org/react'
// import { SearchIcon, ChevronDownIcon, PlusIcon } from 'lucide-react'
// import { useCallback, SetStateAction } from 'react'
// import { columns } from './config'

// export default function TopContent({

// }) {

//   const onSearchChange = useCallback((value: SetStateAction<string>) => {
//     if (value) {
//       setFilterValue(value);
//       setPage(1);
//     } else {
//       setFilterValue('');
//     }
//   }, []);

//   return (
//     <div className="flex flex-col gap-4">
//         <div className="flex justify-between gap-3 items-end">
//           <Input
//             isClearable
//             classNames={{
//               base: 'w-full sm:max-w-[44%]',
//               inputWrapper: 'border-1',
//             }}
//             placeholder="Search by name..."
//             size="sm"
//             startContent={<SearchIcon className="text-default-300" />}
//             value={filterValue}
//             variant="bordered"
//             onClear={() => setFilterValue('')}
//             onValueChange={onSearchChange}
//           />
//           <div className="flex gap-3">
//             <Dropdown>
//               <DropdownTrigger className="hidden sm:flex">
//                 <Button
//                   endContent={<ChevronDownIcon className="text-small" />}
//                   size="sm"
//                   variant="flat"
//                 >
//                   Status
//                 </Button>
//               </DropdownTrigger>
//               <DropdownMenu
//                 disallowEmptySelection
//                 aria-label="Table Columns"
//                 closeOnSelect={false}
//                 selectedKeys={statusFilter}
//                 selectionMode="multiple"
//                 onSelectionChange={setStatusFilter}
//               >
//                 {Object.values(StatusItem).map((status) => (
//                   <DropdownItem
//                     key={status}
//                     className="capitalize"
//                     aria-label={capitalize(status)}
//                   >
//                     {capitalize(status)}
//                   </DropdownItem>
//                 ))}
//               </DropdownMenu>
//             </Dropdown>
//             <Dropdown>
//               <DropdownTrigger className="hidden sm:flex">
//                 <Button
//                   endContent={<ChevronDownIcon className="text-small" />}
//                   size="sm"
//                   variant="flat"
//                 >
//                   Columns
//                 </Button>
//               </DropdownTrigger>
//               <DropdownMenu
//                 disallowEmptySelection
//                 aria-label="Table Columns"
//                 closeOnSelect={false}
//                 selectedKeys={visibleColumns}
//                 selectionMode="multiple"
//                 onSelectionChange={setVisibleColumns}
//               >
//                 {columns.map((column) => (
//                   <DropdownItem
//                     key={column.uid}
//                     className="capitalize"
//                     aria-label={column.name}
//                   >
//                     {column.name}
//                   </DropdownItem>
//                 ))}
//               </DropdownMenu>
//             </Dropdown>
//             <Button
//               className={`bg-foreground text-background`}
//               endContent={<PlusIcon />}
//               size="sm"
//               onPress={() => onOpenModalAddItem()}
//             >
//               Add New
//             </Button>
//           </div>
//         </div>
//         <div className="flex justify-between items-center">
//           <span className="text-default-400 text-small">
//             Total {items.length} item
//           </span>
//           <label className="flex items-center text-default-400 text-small">
//             Rows per page:
//             <select
//               className="bg-transparent outline-none text-default-400 text-small"
//               onChange={onRowsPerPageChange}
//             >
//               <option value="5">5</option>
//               <option value="10">10</option>
//               <option value="15">15</option>
//             </select>
//           </label>
//         </div>
//       </div>
//   )
// }
