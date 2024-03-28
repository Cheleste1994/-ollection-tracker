import {
  CreateUserInput,
  UpdateUserInput,
  User,
  UserDelete,
} from '@/types/user';
import { TypedDocumentNode, gql } from '@apollo/client';

export type CreateUserRes = Pick<User, 'email' | 'id' | 'status' | 'role'>;

export const REGISTER_USER_BY_TOKEN: TypedDocumentNode<
  { createUser: CreateUserRes },
  { dto: CreateUserInput }
> = gql`
  mutation ($dto: CreateUserInput!) {
    createUser(dto: $dto) {
      id
      email
      status
      role
    }
  }
`;

export const USERS_DELETE: TypedDocumentNode<
  {
    deleteUser: UserDelete;
  },
  {
    usersIds: string[];
  }
> = gql`
  mutation ($usersIds: [String!]!) {
    deleteUser(usersIds: $usersIds) {
      isCurrent
      isDelete
    }
  }
`;

export type UpdateUserRes = Pick<User, 'email' | 'role' | 'status'>;

export const UPDATE_USER_BY_ROLE: TypedDocumentNode<
  {
    updateUser: UpdateUserRes;
  },
  {
    userId: string;
    dto: UpdateUserInput;
  }
> = gql`
  mutation ($userId: String!, $dto: UpdateUserInput!) {
    updateUser(userId: $userId, dto: $dto) {
      email
      role
      status
    }
  }
`;
