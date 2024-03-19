import { CountryRes } from '@/api/query/countries';
import { InputsContacts } from '@/types/profile';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { memo, useDeferredValue } from 'react';
import { Control, Controller } from 'react-hook-form';

type AutocompleteProps = {
  control: Control<InputsContacts>;
  data?: {
    countries: CountryRes[];
  };
  disabled: boolean;
  isLoading: boolean;
  countryId?: string | null;
};

export default memo(function AutocompleteCountry(props: AutocompleteProps) {
  const { control, data, disabled, countryId, isLoading } = props;

  const deferredCountries = useDeferredValue(data);

  return (
    <Controller
      defaultValue={''}
      name={'countryId'}
      control={control}
      render={({ field }) => (
        <Autocomplete
          variant="underlined"
          label="Select country"
          isDisabled={disabled}
          isLoading={isLoading}
          onKeyDown={(e: any) => e.continuePropagation()}
          defaultItems={deferredCountries ? deferredCountries.countries : []}
          defaultSelectedKey={countryId || undefined}
          onSelectionChange={field.onChange}
          {...field}
        >
          {({ id, name, flag }) => (
            <AutocompleteItem key={id} value={id}>
              {`${flag} ${name}`}
            </AutocompleteItem>
          )}
        </Autocomplete>
      )}
    />
  );
});
