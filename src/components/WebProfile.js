import React from "react";
import styled from 'styled-components';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

const FIO = styled.p`
    font-size: 22px;
`;

const Email = styled.p`
    font-size: 22px;
`;

const Login = styled.p`
    font-size: 22px;
`;

const DateCreated = styled.p`
    font-size: 22px;
`;

const WebProfile = props => {
    return (
        <React.Fragment>
            <FIO><b>{props.me.lastname} {props.me.firstname} {props.me.surname}</b></FIO>
            <Email><b>Email:</b> {props.me.email}</Email>
            <Login><b>Логин:</b> {props.me.username}</Login>
            <DateCreated><b>Аккаунт создан:</b> {format(parseISO(props.me.createdAt), 'd MMMM yyyy HH:mm', { locale: ru })}</DateCreated>
        </React.Fragment>
    );
};

export default WebProfile;