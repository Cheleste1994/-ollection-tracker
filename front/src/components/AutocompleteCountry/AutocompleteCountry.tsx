import { CountryRes } from '@/api/query/countries';
import { Autocomplete, AutocompleteItem, Spinner } from '@nextui-org/react';

export default function AutocompleteCountry({
  data,
}: {
  data?: {
    countries: CountryRes[];
  };
}) {
  return (
    <Autocomplete
      variant="underlined"
      label="Select country"
      onKeyDown={(e: any) => e.continuePropagation()}
    >
      {data ? (
        data.countries.map(({ flag, name }) => (
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
}
