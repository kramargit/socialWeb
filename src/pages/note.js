import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

import Note from '../components/Note';

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

const NotePage = props => {
    const { id } = useParams();

    const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });

    if (loading) return <p>Загрузка данных...</p>;

    if (error) return <p>Ошибка загрузки данных!</p>;

    return <Note note={data.note} />
};

export default NotePage;