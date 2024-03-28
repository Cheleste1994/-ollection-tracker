import { Item, CreateItemInput, CreateItemContainerInput } from '@/types/items';
import { TypedDocumentNode, gql } from '@apollo/client';

export type CreateItemRes = Pick<Item, 'userId' | 'id'>;

export const CREATE_ITEM_CONTAINER: TypedDocumentNode<
  { createItemContainer: CreateItemRes },
  { dto: CreateItemContainerInput }
> = gql`
  mutation ($dto: CreateItemContainerInput!) {
    createItemContainer(dto: $dto) {
      id
      userId
    }
  }
`;

export const CREATE_ITEM: TypedDocumentNode<
  { createItem: CreateItemRes },
  { dto: CreateItemInput }
> = gql`
  mutation ($dto: CreateItemInput!) {
    createItem(dto: $dto) {
      id
      userId
    }
  }
`;

export const ITEMS_DELETE: TypedDocumentNode<
  {
    deleteItems: { isDelete: boolean };
  },
  {
    itemIds: string[];
  }
> = gql`
  mutation ($itemIds: [String!]!) {
    deleteItems(itemIds: $itemIds) {
      isDelete
    }
  }
`;
