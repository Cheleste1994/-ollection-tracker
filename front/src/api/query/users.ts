import { Auth, AuthDto } from '@/types/user';
import { gql, TypedDocumentNode } from '@apollo/client';

export type AuthRes = Omit<Auth, 'user'>;

export const LOGIN_USER_QUERY: TypedDocumentNode<
  { login: AuthRes },
  { dto: AuthDto }
> = gql`
  query ($dto: AuthDto!) {
    login(dto: $dto) {
      accessToken
    }
  }
`;

export const REGISTER_USER_QUERY: TypedDocumentNode<
  { register: AuthRes },
  { dto: AuthDto }
> = gql`
  query ($dto: AuthDto!) {
    register(dto: $dto) {
      accessToken
    }
  }
`;


export const LOGOUT_USER_QUERY = gql`
  query {
    logout
  }
  `
