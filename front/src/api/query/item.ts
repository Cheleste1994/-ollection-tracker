import { Item } from '@/types/items';
import { gql, TypedDocumentNode } from '@apollo/client';

export type ItemRes = Pick<
  Item,
  'id' | 'name' | 'image' | 'category' | 'status' | 'tags' | 'description'
>;

export const GET_USER_ITEM: TypedDocumentNode<{
  userItems: ItemRes[];
}> = gql`
  query {
    userItems {
      id
      name
      image
      description
      category {
        name
        id
      }
      status
      tags {
        name
        id
      }
    }
  }
`;
