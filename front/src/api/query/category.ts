import { Category } from '@/types/category';
import { gql, TypedDocumentNode } from '@apollo/client';

export type CategoryRes = Pick<Category, 'name' | 'id'>;

export const GET_CATEGORY: TypedDocumentNode<{
  category: CategoryRes[];
}> = gql`
  query {
    category {
      name
      id
    }
  }
`;
