import React from "react";
import NotePrev from './NotePrev';
import styled from "styled-components";

const NoteFeedWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const NoteWrapper = styled.div`
    display: block;
    width: 80%;
    margin: 0 auto;
`

const NoteFeed = ({ notes }) => {
    return (
        <NoteFeedWrapper>
            {notes.map(note => (
                <NoteWrapper key={note.id}>
                    <NotePrev note={note} />
                </NoteWrapper>
            ))}
        </NoteFeedWrapper>
    );
};

export default NoteFeed;