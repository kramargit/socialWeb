import { gql } from "@apollo/client";

const GET_NOTES = gql`
query noteFeed($cursor: String) {
    noteFeed(cursor: $cursor) {
      cursor
      hasNextPage
      notes {
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
  }
`;

const GET_NOTE = gql`
    query note($id: ID!) {
        note(id: $id) {
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

const IS_LOGGED_IN = gql`
    {
        isLoggedIn @client
    }
`;

const GET_MY_NOTES = gql`
    query me {
        me {
            id
            username
            notes {
                id
                createdAt
                updatedAt
                theme
                content
                likeCount
                author {
                    id
                    username
                }
            }
        }
    }
`;

const GET_MY_LIKES = gql`
query me {
    me {
        id
        username
        likes {
            id
            createdAt
            updatedAt
            theme
            content
            likeCount
            author {
                id
                username
            }
        }
    }
}
`;

const GET_ME = gql`
    query me {
        me {
            id
            likes {
                id
            }
        }
    }
`;

const GET_INFO_PROFILE = gql`
    query me {
        me {
            id
            username
            lastname
            firstname
            email
            surname
            createdAt
            likes {
                id
            }
        }
    }
`;

export { GET_NOTES, GET_NOTE, IS_LOGGED_IN, GET_MY_NOTES, GET_MY_LIKES, GET_ME, GET_INFO_PROFILE };