import { ProfileWithUser } from '@/types/profile';
import { Role } from '@/types/user';
import { gql, TypedDocumentNode } from '@apollo/client';

export type ProfileResQuery = Pick<
  ProfileWithUser,
  | 'firstName'
  | 'lastName'
  | 'about'
  | 'avatar'
  | 'countryId'
  | 'gender'
  | 'age'
  | 'userId'
  | 'role'
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
      userId
      role
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
      userId
      role
    }
  }
`;

export type ProfileByRole = {
  currentRole: Role;
  profile: ProfileResQuery;
};

export const GET_PROFILE_BY_ROLE: TypedDocumentNode<
  {
    profileByRole: ProfileByRole;
  },
  {
    userId: string;
  }
> = gql`
  query ($userId: String!) {
    profileByRole(userId: $userId) {
      currentRole
      profile {
        firstName
        lastName
        gender
        about
        avatar
        countryId
        age
        userId
        role
      }
    }
  }
`;
