import { Country } from '@/types/countries';
import { gql, TypedDocumentNode } from '@apollo/client';

export type CountryRes = Pick<
  Country,
  'name' | 'phonecode' | 'flag' | 'isoCode'
>;

export const GET_COUNTRIES: TypedDocumentNode<{
  countries: CountryRes[];
}> = gql`
  query {
    countries {
      name
      phonecode
      flag
      isoCode
    }
  }
`;
