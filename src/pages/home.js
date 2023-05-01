import React from "react";
import { useQuery, gql } from "@apollo/client";

import NoteFeed from "../components/NoteFeed";
import Button from "../components/Button";

//GraphQL-запрос
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

const Home = () => {
    //Хук запроса
    const { data, loading, error, fetchMore } = useQuery(GET_NOTES);

    if (loading) return <p>Загрузка данных...</p>;

    if (error) return <p>Ошибка загрузки данных!</p>;

    return (
      <React.Fragment>
        <NoteFeed notes={data.noteFeed.notes} />
        {data.noteFeed.hasNextPage && (
          <Button
            onClick={() =>
              fetchMore({
                variables: {
                  cursor: data.noteFeed.cursor
                },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                  return {
                    noteFeed: {
                      cursor: fetchMoreResult.noteFeed.cursor,
                      hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                      //Совмещаем результаты со старыми
                      notes: [
                        ...previousResult.noteFeed.notes,
                        ...fetchMoreResult.noteFeed.notes
                      ],
                      __typename: 'noteFeed'
                    }
                  };
                }
              })
            }
          >Загрузить еще</Button>
        )}
      </React.Fragment>
    );
};

export default Home;