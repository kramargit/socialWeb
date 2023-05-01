import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import styled from "styled-components";
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useQuery } from "@apollo/client";

import NoteUser from "./NoteUser";
import { IS_LOGGED_IN } from "../gql/query";
import LikeNote from "./likeNote";

import likedB from '../img/likedBlack.jpg';
import likedY from '../img/likedYellow.jpg';

const Article = styled.article`
    width: 100%;
    margin: 0 0 15px 0;
    border: 2px solid black;
    padding: 5px 5px 5px 5px;
    font-size: 1.1em;
    border-radius: 10px;

    .topPrev {
        display: flex;
        justify-content: space-between;
    }

    .themePrev a{
        font-weight: 700;
        color: black;
        text-transform: capitalize;
        text-decoration: underline;
        cursor: pointer;
    }

    .themePrev a:hover {
        color: #ffdd02;
    }

    .datePrev {
        display: flex;
        flex-direction: column;
    }

    .middlePrev {
        height: 50px;
        overflow: hidden;
    }

    .middlePrev p {
        margin: 0;
    }

    .bottomPrev {
        display: flex;
        justify-content: space-between;
    }

    .likeInfoPrev {
        display: flex;
        align-items: center;
    }

    .likeCountPrev {
        margin: 0 10px 0 0;
    }

    .likedPrev {
        width: 30px;
        height: 30px;
        position: relative;
        background: url(${likedB});
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        cursor: pointer;
    }

    .likedPrev:hover {
        width: 30px;
        height: 30px;
        background: url(${likedY});
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        cursor: pointer;
    }

    .likedPrevClick::after {
        content: attr(data-liked-by);
    }

    .likedPrevClick {
        position: relative;
    }

    .likedPrevClick::after{
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

    .authorPrev {
        display: flex;
        justify-content: center;
        flex-direction: column;
    }

    .AuthorNote {
        color: black;
        text-decoration: none;
    }

    .AuthorNote:hover {
        text-decoration: underline;
    }
`

const NotePrev = ({ note }) => {
    const [clickedElement, setClickedElement] = useState(null);

    const [likedBy, setLikedBy] = useState([]);

    const { loading, error, data } = useQuery(IS_LOGGED_IN);

    const handleLikeClick = () => {
        setClickedElement(clickedElement === note.id ? null : note.id);
    };

    useEffect(() => {
        setLikedBy(note.likedBy);
      }, [note]);

    return (
        <Article>
            <div className='topPrev'>
                <div className="themePrev">
                    <Link to={`/note/${note.id}`}>{note.theme}</Link>
                </div>
                <div className='datePrev'>
                    <div className='createdPrev'>Создана: {format(parseISO(note.createdAt), 'd MMMM yyyy HH:mm', { locale: ru })}</div>
                    <div className='updatedPrev'>Последнее обновление: {format(parseISO(note.updatedAt), 'd MMMM yyyy HH:mm', { locale: ru })}</div>
                </div>
            </div>
            <div className='middlePrev'>
                <ReactMarkdown children={note.content} />
            </div>
            <div className='bottomPrev'>
                <div className='likeInfoPrev'>
                    <NoteUser action={'like'} note={note} />
                    <span className="likeCountPrev">{note.likeCount}</span>
                    <div className=
                        {`likedPrev ${clickedElement === note.id ? 'likedPrevClick' : ''}`}
                        onClick={handleLikeClick}
                        data-liked-by={likedBy.map(user => user.username).join(', ')}
                    >
                    </div>
                </div>
                <div className='authorPrev'>
                    <Link className='AuthorNote' to='#'><b>Автор:</b> {note.author.username}</Link>
                    {data.isLoggedIn && (
                        <NoteUser note={note} />
                    )
                    }
                </div>
            </div>
        </Article>
    );
};

export default NotePrev;