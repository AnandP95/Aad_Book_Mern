import { gql } from '@apollo/client';

export const GET_ME = gql`
  query GetMe {
    me {
      _id
      username
      email
      savedBooks {
        _id
        title
        authors
        description
        image
      }
    }
  }
`;
export const REMOVE_BOOK = gql`
  mutation RemoveBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      savedBooks {
        _id
        title
        authors
        description
        image
      }
    }
  }
`;

