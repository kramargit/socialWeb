import React from 'react';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';

import Header from './Header';
import Navigation from './Navigation';
import SignIn from '../pages/signin';

const IS_LOGGED_IN = gql`
    {
        isLoggedIn @client
    }
`;

const Main = styled.main`
    width: 100vw;
    height: 88vh;
    display: flex;
    flex-wrap: wrap;
    overflow-y: scroll;
`;

const Aside = styled.aside`
    width: 30vw;
    background-color: black;
`;

const Section = styled.section`
    width: 68vw;
    padding: 25px 25px 25px 25px;
`;

const Layout = ({ children }) => {

    const { data, client } = useQuery(IS_LOGGED_IN);

    return (
        <React.Fragment>
            {
                data.isLoggedIn ? (
                    <React.Fragment>
                        <Header />
                        <Main>
                            <Aside>
                                <Navigation />
                            </Aside>
                            <Section>
                                { children }
                            </Section>
                        </Main>
                    </React.Fragment>
                ) : (
                    <SignIn />
                )
            }
        </React.Fragment>
    );
};

export default Layout;
