import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import NoteForm from '../components/NoteForm';
import { GET_NOTE, GET_ME } from '../gql/query';
import { EDIT_NOTE } from '../gql/mutation';

const EditNote = props => {
    const { id } = useParams();

    const navigate = useNavigate();

    const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });

    const { data: userdata } = useQuery(GET_ME);

    const [editNote] = useMutation(EDIT_NOTE, {
        variables: {
            id
        },
        onCompleted: () => {
            navigate(`/note/${id}`);
        }
    });

    if (loading) return <p>Загрузка...</p>;

    if (error) return <p>Ошибка! Запись не найдена</p>;

    if (userdata.me.id !== data.note.author.id) {
        return <p>У вас нет прав на редактирование этой записи</p>
    }

    return <NoteForm theme={data.note.theme} content={data.note.content} action={editNote} />
};

export default EditNote;