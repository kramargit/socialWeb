import React from "react";
import styled from 'styled-components';

const HeaderTeg = styled.header`
    width: 100vw;
    height: 25vh;
    background: black;
`

const HeaderLogo = styled.div`
    width: 500px;
    height: 19vh;
    display: flex;
    flex-direction: row;
`

const Logo = styled.img`
    width: 85%;
    height: 85%;
    object-fit: cover;
    align-self: center;
`

const Header = () => {
    return (
        <HeaderTeg>
            <HeaderLogo>
                <Logo src={require('../../image/main-logo.jpg')} alt="логотип Роснефть" />
            </HeaderLogo>
            <div>
                <input type="text" placeholder="введите фразу для поиска ..." />
            </div>
        </HeaderTeg>
    );
};

export default Header;