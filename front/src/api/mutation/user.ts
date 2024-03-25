import { UserDelete } from "@/types/user";
import { TypedDocumentNode, gql } from "@apollo/client";

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
