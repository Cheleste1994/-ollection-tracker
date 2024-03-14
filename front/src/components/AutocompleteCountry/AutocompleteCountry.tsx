import { CountryRes } from '@/api/query/countries';
import { Autocomplete, AutocompleteItem, Spinner } from '@nextui-org/react';
import { memo, useDeferredValue } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type AutocompleteProps = {
  register: UseFormRegisterReturn;
  data?: {
    countries: CountryRes[];
  };
};

export default memo(function AutocompleteCountry(props: AutocompleteProps) {
  const { register, data } = props;

  const deferredCountries = useDeferredValue(data);

  return (
    <Autocomplete
      variant="underlined"
      label="Select country"
      onKeyDown={(e: any) => e.continuePropagation()}
      defaultInputValue={'as'}
      {...register}
    >
      {deferredCountries ? (
        deferredCountries.countries.map(({ flag, name }) => (
          <AutocompleteItem key={`${name} ${flag}`} value={flag}>
            {`${flag} ${name}`}
          </AutocompleteItem>
        ))
      ) : (
        <AutocompleteItem key="argentina" startContent={<Spinner />}>
          Loading
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
});
