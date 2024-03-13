import { Profile } from '@/types/profile';
import { gql, TypedDocumentNode } from '@apollo/client';

export type ProfileRes = Pick<
  Profile,
  'createdAt' | 'updatedAt' | 'firstName' | 'lastName' | 'bio'
>;

export const GET_PROFILE_BY_ID: TypedDocumentNode<
  { getProfileById: ProfileRes },
  { userId: string }
> = gql`
  query ($userId: ID!) {
    getProfileById(userId: $userId) {
      createdAt
      updatedAt
      firstName
      lastName
      bio
    }
  }
`;

export const GET_PROFILE_BY_TOKEN: TypedDocumentNode<{
  profileByToken: ProfileRes;
}> = gql`
  query {
    profileByToken {
      createdAt
      updatedAt
      firstName
      lastName
      bio
    }
  }
`;
