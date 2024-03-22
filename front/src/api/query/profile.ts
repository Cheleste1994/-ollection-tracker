import { Profile } from '@/types/profile';
import { gql, TypedDocumentNode } from '@apollo/client';

export type ProfileResQuery = Pick<
  Profile,
  'firstName' | 'lastName' | 'about' | 'avatar' | 'countryId' | 'gender' | 'age'
>;

export const GET_PROFILE_BY_ID: TypedDocumentNode<
  { getProfileById: ProfileResQuery },
  { userId: string }
> = gql`
  query ($userId: ID!) {
    getProfileById(userId: $userId) {
      firstName
      lastName
      gender
      about
      avatar
      countryId
      age
    }
  }
`;

export const GET_PROFILE_BY_TOKEN: TypedDocumentNode<{
  profileByToken: ProfileResQuery;
}> = gql`
  query {
    profileByToken {
      firstName
      lastName
      gender
      about
      avatar
      countryId
      age
    }
  }
`;
