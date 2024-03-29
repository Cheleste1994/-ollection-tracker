import { capitalize } from '@/utils/capitalize';
import { Select, Chip, SelectItem } from '@nextui-org/react';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { StatusOptionsItem } from '@/components/TableCollections/config';
import { StatusItem } from '@/types/items';
import { ItemType } from '@/components/TableCollections/TableCollections';

type SelectOptionsItemProps = {
  item: ItemType;
  selectedStatus: Map<string, ItemType>;
  setSelectedStatus: Dispatch<SetStateAction<Map<string, ItemType>>>;
  options: StatusOptionsItem;
};

export default function SelectOptionsItem({
  selectedStatus,
  setSelectedStatus,
  item,
  options,
}: SelectOptionsItemProps) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as keyof StatusOptionsItem;

    if (!value) return;

    setSelectedStatus((state) => {
      state.set(item.id, {
        ...item,
        status: StatusItem[value],
      });
      return state;
    });
  };

  return (
    <Select
      labelPlacement={'inside'}
      className="max-w-[250px] w-full min-w-[80px]"
      variant="underlined"
      defaultSelectedKeys={[item.status]}
      aria-labelledby="select status"
      isRequired={true}
      isDisabled={!selectedStatus.has(item.id)}
      onChange={handleChange}
      startContent={
        <Chip
          className="capitalize border-none gap-1 text-default-600"
          color={(options as StatusOptionsItem)[item.status]}
          size="sm"
          variant="dot"
        />
      }
    >
      {Object.keys(options).map((option) => (
        <SelectItem
          key={option}
          value={option}
          className="max-w-full"
          startContent={
            <Chip
              className="capitalize border-none gap-1 text-default-600"
              color={options[option as keyof typeof options]}
              size="sm"
              variant="dot"
              key={option}
            />
          }
        >
          {capitalize(option)}
        </SelectItem>
      ))}
    </Select>
  );
}
