import { Profile } from '@/types/profile';
import { gql, TypedDocumentNode } from '@apollo/client';

export type UploadResQuery = Pick<Profile, 'avatar'>;

export const UPLOAD_FILE: TypedDocumentNode<{ uploadAvatar: UploadResQuery }> =
  gql`
    mutation ($file: Upload!) {
      uploadAvatar(file: $file) {
        avatar
      }
    }
  `;
