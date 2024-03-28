import { UserType } from '@/components/TableUser/TableUser';
import { RoleOptions, StatusOptions } from '@/components/TableUser/config';
import { capitalize } from '@/utils/capitalize';
import { Select, Chip, SelectItem } from '@nextui-org/react';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

type SelectOptionsProps = {
  profile: UserType;
  selectedStatus: Map<string, UserType>;
  setSelectedStatus: Dispatch<SetStateAction<Map<string, UserType>>>;
  options: StatusOptions | RoleOptions;
};

export default function SelectOptions({
  selectedStatus,
  setSelectedStatus,
  profile,
  options,
}: SelectOptionsProps) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (!value) return;

    if (Object.keys(options).includes('ACTIVE')) {
      setSelectedStatus((state) => {
        state.set(profile.userId, {
          ...profile,
          status: value as keyof StatusOptions,
        });
        return state;
      });
    } else {
      setSelectedStatus((state) => {
        state.set(profile.userId, {
          ...profile,
          role: value as keyof RoleOptions,
        });
        return state;
      });
    }
  };

  return (
    <Select
      labelPlacement={'inside'}
      className="max-w-[250px] w-full min-w-[80px]"
      variant="underlined"
      defaultSelectedKeys={[
        Object.keys(options).includes('ACTIVE') ? profile.status : profile.role,
      ]}
      aria-labelledby="select status"
      isRequired={true}
      isDisabled={!selectedStatus.has(profile.userId)}
      onChange={handleChange}
      startContent={
        Object.keys(options).includes('ACTIVE') && (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={(options as StatusOptions)[profile.status]}
            size="sm"
            variant="dot"
          />
        )
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
