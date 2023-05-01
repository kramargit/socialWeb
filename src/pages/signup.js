import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components';
import { useMutation, useApolloClient, gql } from '@apollo/client';

import Button from '../components/Button';

const SIGNUP_USER = gql`
    mutation signUp($username: String!, $email: String!, $password: String!, $lastname: String!, $firstname: String!, $surname: String!) {
        signUp(username: $username, email: $email, password: $password, lastname: $lastname, firstname: $firstname, surname: $surname)
    }
`;

const H1 = styled.h1`
    text-align: center;
    margin: 0 0 30px 0;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 70%;
    margin: 0 auto;

    label {
        cursor: pointer;
        font-size: 20px;
        font-weight: 600;
    }

    input {
        margin: 0 0 20px 0;
        height: 35px;
    }

    .stateReg {
        margin: 0 0 0 50px;
        font-size: 20px;
    }

    .stateRegSuccess {
        color: green;
    }

    .stateRegError {
        color: red;
    }
`

const SignUp = () => {
    const [values, setValues] = useState();

    const stateRegRef = useRef(null);

    const onChange = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    useEffect(() => {
        document.title = 'Регистрация';
    });

    const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
        onCompleted: data => {
            //в моем случае хук будет возвращать булево значение
            //вместо jwt
            //localStorage.setItem('token', data.signUp);
            if (data.signUp) {
                stateRegRef.current.classList.remove('stateRegError');
                stateRegRef.current.classList.add('stateRegSuccess');
                stateRegRef.current.innerHTML = 'Регистрация прошла успешно!';
            } else {
                stateRegRef.current.classList.remove('stateRegSuccess');
                stateRegRef.current.classList.add('stateRegError');
                stateRegRef.current.innerHTML = 'Ошибка при регистрации!';
            }
        }
    });

    return (
        <React.Fragment>
            <H1>Регистрация пользователя</H1>
            <Form
                onSubmit={event => {
                    event.preventDefault();
                    signUp({
                        variables: {
                            ...values
                        }
                    });
                }}
            >
                <label htmlFor='email'>Email: </label>
                <input required type='email' id='email' name='email' placeholder='email' onChange={onChange} />
                <label htmlFor='username'>Имя пользователя: </label>
                <input required type='text' id='username' name='username' placeholder='Имя пользователя' onChange={onChange} />
                <label htmlFor='password'>Временный пароль: </label>
                <input required type='password' id='password' name='password' placeholder='Временный пароль' onChange={onChange} />
                <label htmlFor='lastname'>Фамилия: </label>
                <input required type='text' id='lastname' name='lastname' placeholder='Фамилия' onChange={onChange} />
                <label htmlFor='firstname'>Имя: </label>
                <input required type='text' id='firstname' name='firstname' placeholder='Имя' onChange={onChange} />
                <label htmlFor='surname'>Отчество: </label>
                <input required type='text' id='surname' name='surname' placeholder='Отчество' onChange={onChange} />
                <div>
                    <Button type='submit'>Зарегистрировать</Button>
                    <span ref={stateRegRef} className="stateReg"></span>
                </div>
            </Form>
        </React.Fragment>
    );
};

export default SignUp;