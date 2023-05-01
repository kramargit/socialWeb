import React from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';

import WebProfile from '../components/WebProfile';
import { GET_INFO_PROFILE } from '../gql/query';

const Header = styled.h1`
    text-align: center;
`;


const Profile = () => {
    const { loading, error, data } = useQuery(GET_INFO_PROFILE);

    if (loading) return <p>Загрузка...</p>;

    if (error) return <p>Ошибка загрузки данных профиля!</p>;

    return (
        <React.Fragment>
            <Header>Профиль пользователя</Header>
            <WebProfile me={data.me} />
        </React.Fragment>
    );
};

export default Profile;