import { Profile, UpdateProfileInput } from '@/types/profile';
import { gql, TypedDocumentNode } from '@apollo/client';

export type ProfileResMutation = Pick<
  Profile,
  'firstName' | 'lastName' | 'about' | 'avatar' | 'countryId' | 'gender'
>;


export const UPDATE_PROFILE_BY_TOKEN: TypedDocumentNode<{
  updateProfile: ProfileResMutation;
}, {
  dto: UpdateProfileInput
}> = gql`
  mutation ($dto: UpdateProfileInput!) {
    updateProfile(dto: $dto) {
      firstName
      lastName
      gender
      about
      avatar
      countryId
    }
  }
`;
