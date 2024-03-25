import { Profile } from '@/types/profile';
import { gql, TypedDocumentNode } from '@apollo/client';

export type UploadResQuery = Pick<Profile, 'avatar'>;

export const UPLOAD_FILE: TypedDocumentNode<{ uploadAvatar: UploadResQuery }, {
  userId: string,
  file: File
}> =
  gql`
    mutation ($userId: String!, $file: Upload!) {
      uploadAvatar(userId: $userId, file: $file) {
        avatar
      }
    }
  `;
