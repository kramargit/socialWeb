import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import addBtnW from '../img/addWhite.jpg';
import addBtnY from '../img/addYellow.jpg';
import updateBtnW from '../img/updateWhite.jpg';
import updateBtnY from '../img/updateYellow.jpg';
import removeBtnW from '../img/removeWhite.jpg';
import removeBtnY from '../img/removeYellow.jpg';
import newDirW from '../img/newDirW.png';
import newDirY from '../img/newDirY.png';

const LeftNavigation = styled.nav`

    padding: 0 0 0 30px;

    ul {
        list-style-type: none;
    }

    a {
        text-decoration: none;
    }

    .navigate-wrap {
        margin: 16px 0 0 0;
        padding: 0 0 0 0;
    }

    .navigate-chapter {
        border: 2px solid black;
    }

    .navigate-chapter-link {
        font-size: 1.5em;
        color: white;
    }

    .navigate-chapter-link:hover {
        color: #ffdd02;
    }

    .navigate-sub {
        padding: 0 0 0 20px;
        display: none;
        flex-direction: column;
    }

    .navigate-sub-chapter {
        display: flex;
        flex-direction: column;
    }

    .navigate-sub-chapter-link{
        font-size: 1.3em;
        color: white;
    }

    .navigate-sub-chapter-link:hover{
        color: #ffdd02;
    }

    .navigate-sub-chapter-btn {
        display: flex;
        margin: 20px 0 0 0;
    }

    .btn-sub {
        width: 30px;
        height: 30px;
        margin: 0 20px 0 0;
        border: none;
        cursor: pointer;
    }

    .btn-newDir-sub {
        background: url(${newDirW});
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }

    .btn-newDir-sub:hover {
        background: url(${newDirY});
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }

    .btn-add-sub {
        background: url(${addBtnW});
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }

    .btn-add-sub:hover {
        background: url(${addBtnY});
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }

    .btn-update-sub {
        background: url(${updateBtnW});
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }

    .btn-update-sub:hover {
        background: url(${updateBtnY});
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }

    .btn-delete-sub {
        background: url(${removeBtnW});
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }

    .btn-delete-sub:hover {
        background: url(${removeBtnY});
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }
`

const Navigation = () => {

    const navigate = useNavigate();

    const addNote = () => {
        navigate('/newnote');
    };

    useEffect(() => {

        const menu = (event) => {
            let ul = event.target.parentNode.querySelector('ul');
	        if(ul.style.display == '' || ul.style.display == 'none') ul.style.display = 'flex';
	        else ul.style.display = 'none';
        };

        for (let item of document.querySelectorAll('.navigate-chapter-link')) {
            item.addEventListener('click', menu);
        }
    }, []);

    return (
        <LeftNavigation>
            <ul className="navigate-wrap">
                <li className="navigate-chapter">
                    <Link className="navigate-chapter-link">Заметки</Link>
                    <ul className="navigate-sub">
                        <li className="navigate-sub-chapter">
                            <Link to='/mynotes' className="navigate-sub-chapter-link">Мои заметки</Link>
                            <Link to='/likes' className="navigate-sub-chapter-link">Понравившиеся</Link>
					    </li>
                        <div className="navigate-sub-chapter-btn">
                            <button className="btn-sub btn-newDir-sub"></button>
                            <button onClick={addNote} className="btn-sub btn-add-sub"></button>
					        <button className="btn-sub btn-update-sub"></button>
					        <button className="btn-sub btn-delete-sub"></button>
                        </div>
                    </ul>
                </li>
            </ul>
        </LeftNavigation>
    );
};

export default Navigation;
