import { Tag } from '@/types/items';
import { gql, TypedDocumentNode } from '@apollo/client';

export type TagRes = Pick<Tag, 'name' | 'id'>;

export const GET_TAGS: TypedDocumentNode<{
  tags: TagRes[];
}> = gql`
  query {
    tags {
      name
      id
    }
  }
`;
