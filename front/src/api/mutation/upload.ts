import { Item } from '@/types/items';
import { Profile } from '@/types/profile';
import { gql, TypedDocumentNode } from '@apollo/client';

export type UploadAvatarRes = Pick<Profile, 'avatar'>;

export const UPLOAD_AVATAR: TypedDocumentNode<
  { uploadAvatar: UploadAvatarRes },
  {
    userId: string;
    file: File;
  }
> = gql`
  mutation ($userId: String!, $file: Upload!) {
    uploadAvatar(userId: $userId, file: $file) {
      avatar
    }
  }
`;

export type UploadItemRes = Pick<Item, 'image'>;

export const UPLOAD_ITEMS: TypedDocumentNode<
  { uploadItem: UploadItemRes },
  {
    file: File;
    itemId: string;
  }
> = gql`
  mutation ($file: Upload!, $itemId: String!) {
    uploadItem(file: $file, itemId: $itemId) {
      image
    }
  }
`;
