import React, { useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import NoteForm from '../components/NoteForm';

import { GET_MY_NOTES, GET_NOTES, IS_LOGGED_IN } from '../gql/query';

const NEW_NOTE = gql`
    mutation newNote ($theme: String!, $content: String!){
        newNote(theme: $theme, content: $content) {
          id
          theme
          createdAt
          content
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

const NewNote = props => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Новая запись';
    });

    const [data, { loading, error }] = useMutation(NEW_NOTE, {
        // Повторно получаем запрос GET_NOTES, чтобы обновить кеш
        refetchQueries: [{ query: GET_NOTES }, { query: GET_NOTES }],
        onCompleted: data => {
            navigate(`../note/${data.newNote.id}`);
        }
    })

    return (
        <React.Fragment>
            {loading && <p>Загрузка...</p>}
            {error && <p>Ошибка при сохранении записи</p>}
            <NoteForm action={data} />
        </React.Fragment>
    );
};

export default NewNote;