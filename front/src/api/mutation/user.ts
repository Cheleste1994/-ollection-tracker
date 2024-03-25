import { CreateUserInput, User, UserDelete } from "@/types/user";
import { TypedDocumentNode, gql } from "@apollo/client";

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
