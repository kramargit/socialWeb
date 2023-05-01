import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import { useApolloClient, gql } from "@apollo/client";

import searchBtn from '../img/searchBtn.svg';
import searchBtnY from '../img/searchBtnYellow.png';

const HeaderTeg = styled.header`
    width: 100vw;
    height: 112px;
    background: black;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 2px 4px white;
    z-index: 1;
`

const HeaderLogo = styled.div`
    color: #ffdd02;
    font-size: 2.5em;
    font-weight: 900;
    padding: 23px 0 0 30px;
    cursor: context-menu;
`

const TopNavigation = styled.nav`
    display: flex;
    padding: 26px 30px 0 0;

    .search-container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.9);
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease-in-out, visibility 0s linear 0.3s;
        z-index: 9999;
    }

    .searchResponse {
        width: 100%;
        min-height: 100px;
        background-color: #fff;
        padding: 20px;
        position: absolute;
        top: 282%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .search-container.show {
        opacity: 1;
        visibility: visible;
        transition-delay: 0s;
    }

    .search-box {
        width: 50%;
        height: 70px;
        position: absolute;
        top: 5%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        padding: 20px;
        border-radius: 5px;
    }

    input {
        width: 100%;
        height: 32px;
    }

    .btnSearch {
        display: block;
        cursor: pointer;
        width: 60px;
        height: 60px;
        background-image: url(${searchBtn});
        background-repeat: no-repeat;
        background-position: center;
        background-size: 35px;
    }

    .btnSearch:hover {
        background-image: url(${searchBtnY});
        background-repeat: no-repeat;
        background-position: center;
        background-size: 35px;
    }

    a {
        text-decoration: none;
        color: white;
    }

    a:hover {
        color: #ffdd02;
    }

    .logOut {
        background: transparent;
        color: white;
        border: none;
        cursor: pointer;
    }

    .logOut:hover {
        color: #ffdd02;
    }

    ul {
        display: flex;
        margin: 0;
        list-style-type: none;
        padding: 20px 0 0 0;
    }

    li {
        padding: 0 0 0 20px;
    }

    .responseLink a {
        display: flex;
        flex-direction: column;
        color: blue !important;
        font-size: 25px;
    }
`

const Header = props => {

    const [showSearch, setShowSearch] = useState(false);
    const [searchResponse, setsearchResponse] = useState(true);

    const client = useApolloClient();

    const navigate = useNavigate();

    const handleSearchBtnClick = () => {
        setShowSearch(true);
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.keyCode === 27) {
                setShowSearch(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <HeaderTeg>
            <HeaderLogo>
                <span>RN_ADMIN</span>
            </HeaderLogo>
            <TopNavigation>
                <div className="btnSearch" onClick={handleSearchBtnClick}></div>
                <div className={`search-container ${showSearch ? 'show' : ''}`}>
                    <div className="search-box">
                        <input type="text" placeholder="введите фразу для поиска ..." />
                        {
                            searchResponse ? (
                                <div className="searchResponse">
                                    <h3>Найденные результаты</h3>
                                    <div className="responseLink">
                                        <Link to='#'>Пример 1</Link>
                                        <Link to='#'>Пример 2</Link>
                                        <Link to='#'>Пример 3</Link>
                                        <Link to='#'>Пример 4</Link>
                                    </div>
                                </div>
                            ) : (
                                <div className="searchResponse">
                                    <span>Ни чего не найдено</span>
                                </div>
                            )
                        }
                    </div>
                </div>
                <ul>
                    <li>
                        <Link to='/'>Домашняя</Link>
                    </li>
                    <li>
                        <Link to="/profile">Профиль</Link>
                    </li>
                    <li>
                        <Link to="#">Сообщения</Link>
                    </li>
                    <li>
                        <Link to="/settings">Настройки</Link>
                    </li>
                    <li>
                        <button className='logOut'
                        onClick={() => {
                            //удаление токена
                            localStorage.removeItem('token');
                            //очистка кеша
                            client.resetStore();
                            //обновляем локальное состояние
                            client.writeQuery({
                                query: gql`query { isLoggedIn }`,
                                data: {
                                  isLoggedIn: false
                                }
                              });
                            navigate('/');
                        }}
                        >Выход</button>
                    </li>
                </ul>
            </TopNavigation>
        </HeaderTeg>
    );
};

export default Header;