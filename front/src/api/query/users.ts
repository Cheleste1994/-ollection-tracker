import { Auth, AuthDto } from '@/types/user';
import { gql, TypedDocumentNode } from '@apollo/client';

type AuthRes = Omit<Auth, 'user'>;

export const LOGIN_USER_QUERY: TypedDocumentNode<AuthRes, { dto: AuthDto }> =
  gql`
    query ($dto: AuthDto!) {
      login(dto: $dto) {
        accessToken
      }
    }
  `;

export const REGISTER_USER_QUERY: TypedDocumentNode<AuthRes, { dto: AuthDto }> =
  gql`
    query ($dto: AuthDto!) {
      register(dto: $dto) {
        accessToken
      }
    }
  `;
