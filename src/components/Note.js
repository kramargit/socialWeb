import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactMarkdown from 'react-markdown';
import { Link } from "react-router-dom";
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useQuery } from "@apollo/client";

import NoteUser from "./NoteUser";
import { IS_LOGGED_IN, GET_ME } from "../gql/query";
import LikeNote from "./likeNote";

import likedB from '../img/likedBlack.jpg';
import likedY from '../img/likedYellow.jpg';

const ArticleNote = styled.article`
    .topNoteTheme {
        text-align: center;
        text-transform: capitalize;
    }

    .middleNote {
        font-size: 24px;
    }

    .bottomNote {
        display: flex;
        justify-content: space-between;
    }

    .likeInfoNote {
        display: flex;
        align-items: center;
    }

    .likeCountNote {
        margin: 0 10px 0 0;
    }

    .likedNote {
        width: 30px;
        height: 30px;
        position: relative;
        background: url(${likedB});
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        cursor: pointer;
    }

    .likedNote:hover {
        width: 30px;
        height: 30px;
        background: url(${likedY});
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        cursor: pointer;
    }

    .likedNoteClick::after {
        content: attr(data-liked-by);
    }

    .likedNoteClick {
        position: relative;
    }

    .likedNoteClick::after{
        position: absolute;
        left: 30px;
        width: 300px;
        height: 300px;
        border: 1px solid black;
        background: rgba(0, 0, 0, 0.9);
        overflow-y: scroll;
        color: white;
        padding: 10px;
    }

    .AuthorNote {
        color: black;
        text-decoration: none;
    }

    .AuthorNote:hover {
        text-decoration: underline;
    }
`

const Note = ({ note }) => {
    const [likedAfter, setLikedAfter] = useState(false);

    const [likedBy, setLikedBy] = useState([]);

    const { loading, error, data } = useQuery(IS_LOGGED_IN);

    useEffect(() => {
        setLikedBy(note.likedBy);
        const elem = document.querySelector('.likedNote');

        const addAfterCss = () => {
            if (!likedAfter) {
                elem.classList.add('likedNoteClick');
                setLikedAfter(true);
            } else {
                elem.classList.remove('likedNoteClick');
                setLikedAfter(false);
            }
        };

        elem.addEventListener("click", addAfterCss);
        return () => {
            elem.removeEventListener("click", addAfterCss);
        };
    },
    [likedAfter, note]);

    return (
        <ArticleNote>
            <div className="topNote">
                <h1 className="topNoteTheme">{note.theme}</h1>
            </div>
            <div className="middleNote">
                <ReactMarkdown children={note.content} />
            </div>
            <div className="bottomNote">
                <div className='likeInfoNote'>
                    <NoteUser action={'like'} note={note} />
                    <span className="likeCountNote">{note.likeCount}</span>
                    <div
                    className="likedNote"
                    data-liked-by={likedBy.map(user => user.username).join(', ')}
                    ></div>
                </div>
                <div className='authorNote'>
                    <div className="noteUpdate">{format(parseISO(note.updatedAt), 'd MMMM yyyy HH:mm', { locale: ru })}</div>
                    <Link className="AuthorNote" to='#'><b>Автор:</b> {note.author.username} </Link><br />
                    {data.isLoggedIn && (
                        <NoteUser note={note} />
                    )
                    }
                </div>
            </div>
        </ArticleNote>
    );
};

export default Note;