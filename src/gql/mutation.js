import { gql } from "@apollo/client";

const EDIT_NOTE = gql`
    mutation updateNote($id: ID!, $theme: String!, $content: String!) {
        updateNote(id: $id, theme: $theme, content: $content) {
          id
          theme
          content
          createdAt
          updatedAt
          likeCount
          likedBy {
            id
            username
          }
          author {
            id
            username
          }
        }
      }
`;

const DELETE_NOTE = gql`
  mutation deleteNote($id: ID!) {
    deleteNote(id: $id)
  }
`;

const TOGGLE_LIKE = gql`
  mutation toggleLike($id: ID!) {
    toggleLike(id: $id) {
      id
      likeCount
      likedBy {
        username
      }
    }
  }
`;

export { EDIT_NOTE, DELETE_NOTE, TOGGLE_LIKE };