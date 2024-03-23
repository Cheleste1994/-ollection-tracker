import { FileDownload } from '@/types/files';
import { gql, TypedDocumentNode } from '@apollo/client';

export const FILES_DOWNLOAD: TypedDocumentNode<
  { filesDownload: FileDownload[] },
  { arrId: string[] }
> = gql`
  query ($arrId: [String!]!) {
    filesDownload(arrId: $arrId) {
      file
      id
    }
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
