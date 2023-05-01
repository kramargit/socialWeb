import React from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { DELETE_NOTE } from "../gql/mutation";
import { GET_MY_NOTES, GET_NOTES } from "../gql/query";

const Button = styled.button`
    width: 200px;
    height: 40px;
    cursor: pointer;
    background: black;
    color: white;
    border: none;

    :hover {
        color: #ffdd02;
    }
`;

const DeleteNote = props => {
    const navigate = useNavigate();

    const [deleteNote] = useMutation(DELETE_NOTE, {
        variables: {
            id: props.noteId
        },
        refetchQueries: [{ query: GET_MY_NOTES, GET_NOTES }],
        onCompleted: data => {
            navigate('/mynotes');
        }
    });
    return <Button onClick={deleteNote}>Удалить запись</Button>;
};

export default DeleteNote;