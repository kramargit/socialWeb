import React from 'react';
import styled from 'styled-components';

import Header from './Header';
import Navigation from './Navigation';

const Main = styled.main`
    width: 100vw;
    height: 85vh;
    display: flex;
    flex-wrap: wrap;
`

const Aside = styled.aside`
    width: 30vw;
`

const Section = styled.section`
    width: 70vw;
`

const Layout = ({ children }) => {
    return(
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
    );
};

export default Layout;