import { gql, TypedDocumentNode } from '@apollo/client';

export const FILES_DOWNLOAD: TypedDocumentNode<
  { filesDownload: string },
  { id: string }
> = gql`
  query ($id: String!) {
    filesDownload(id: $id)
  }
`;

export const TEMPORARY_LINK: TypedDocumentNode<
  { temporaryLink: string },
  { id: string }
> = gql`
  query ($id: String!) {
    temporaryLink(id: $id)
  }
`;
