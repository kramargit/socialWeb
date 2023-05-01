import React from "react";
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import styled from "styled-components";

import { GET_ME } from "../gql/query";
import DeleteNote from "./DeleteNote";
import LikeNote from "./likeNote";

const Wrapper = styled.div`
    .UpdateNote {
        color: black;
        text-decoration: none;
    }

    .UpdateNote:hover {
        text-decoration: underline;
    }
`;

const NoteUser = props => {
    const { loading, error, data } = useQuery(GET_ME);

    if (loading) return <p>Загрузка...</p>;

    if (error) return <p>Загрузка...</p>;

    return (
        <Wrapper>
            {props.action === 'like' ? (
                    <LikeNote me={data.me} noteId={props.note.id} likeCount={props.note.likeCount} />
            ) : (
                data.me.id === props.note.author.id && (
                    <React.Fragment>
                        <Link className='UpdateNote' to={`/edit/${props.note.id}`}>Редактировать запись</Link><br />
                        <DeleteNote noteId={props.note.id} />
                    </React.Fragment>
                )
            )}
        </Wrapper>
    );
};

export default NoteUser;