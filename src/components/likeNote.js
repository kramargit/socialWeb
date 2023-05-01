import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import styled from "styled-components";

import { GET_MY_LIKES } from "../gql/query";
import { TOGGLE_LIKE } from "../gql/mutation";

import likeB from '../img/likeBlack.jpg';
import likeY from '../img/likeYellow.jpg';

const Like = styled.div`
    width: 30px;
    height: 30px;
    margin: 0 2px 0 0;
    background: url(${likeB});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;

    :hover {
        width: 30px;
        height: 30px;
        background: url(${likeY});
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        cursor: pointer;
    }
`;

const LikeNote = props => {
    const [count, setCount] = useState(props.likeCount);

    const [liked, setLiked] = useState(
        props.me.likes.filter(note => note.id === props.noteId).length > 0
    );

    const [toggleLike] = useMutation(TOGGLE_LIKE, {
        variables: {
            id: props.noteId
        },
        refetchQueries: [{ query: GET_MY_LIKES }]
    });

    return (
        <React.Fragment>
            {liked ? (
                <Like
                    onClick={() => {
                        toggleLike();
                        setLiked(false);
                        setCount(count - 1);
                    }}
                />
            ) : (
                <Like
                    onClick={() => {
                        toggleLike();
                        setLiked(true);
                        setCount(count + 1);
                    }}
                />
            )}
        </React.Fragment>
    );
};

export default LikeNote;