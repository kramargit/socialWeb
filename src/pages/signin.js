import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useMutation, useApolloClient, gql } from '@apollo/client';

import Button from '../components/Button';

const SIGNIN_USER = gql`
    mutation signIn($username: String, $email: String, $password: String!) {
        signIn(username: $username, email: $email, password: $password)
    }
`;

const Auth = styled.div`
    width: 700px;
    height: 430px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid black;
    text-align: center;
    padding: 30px 0 0 0;

    h1 {
        margin: 0 0 30px 0;
    }

    .authForm {
        font-size: 20px;
    }

    table {
        width: 530px;
        margin: 0 auto;
        border-spacing: 10px 25px;
    }

    input {
        width: 410px;
    }

    .authLabel {
        text-align: left;
    }

    .authBottom {
        display: flex;
        justify-content: space-around;
    }

    a {
        margin: 15px 0 0 0;
    }
`;

const SignIn = () => {

    useEffect(() => {
        document.title = 'Авторизация';
    });

    const client = useApolloClient();
    const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
        onCompleted: data => {
            localStorage.setItem('token', data.signIn);
            client.writeQuery({
                query: gql`query { isLoggedIn }`,
                data: {
                  isLoggedIn: true
                }
              });
        }
    });

    const [values, setValues] = useState();

    const onChange = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    return (
        <React.Fragment>
        <Auth>
            <h1>Авторизация</h1>
            <form className='authForm'
                onSubmit={e => {
                    e.preventDefault();
                    signIn({
                        variables: {
                            ...values
                        }
                    });
                }}
            >
                <table>
                    <tr>
                        <td className='authLabel'><label htmlFor='username'>Логин: </label></td>
                        <td><input type='text' id='username' name='username' placeholder='Логин' onChange={onChange} /></td>
                    </tr>
                    <tr>
                        <td className='authLabel'><label htmlFor='email'>Email: </label></td>
                        <td><input type='email' id='email' name='email' placeholder='Email' onChange={onChange} /></td>
                    </tr>
                    <tr>
                        <td className='authLabel'><label htmlFor='password'>Пароль: </label></td>
                        <td><input required type='password' id='password' name='password' placeholder='Пароль' onChange={onChange} /></td>
                    </tr>
                </table>
                <div className='authBottom'>
                    <Button type='submit'>Войти</Button>
                    <Link to='/resetpass'>Забыли пароль?</Link>
                </div>
            </form>
        </Auth>
        {loading && <p>Загрузка...</p>}
        {error && <p>Ошибка при входе...</p>}
    </React.Fragment>
    );
};

export default SignIn;