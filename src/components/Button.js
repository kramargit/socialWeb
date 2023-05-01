import React from "react";
import styled from 'styled-components';

const ButtonStyle = styled.button`
    width: 200px;
    height: 60px;
    cursor: pointer;
    background: black;
    color: white;
    border: none;

    :hover {
        color: #ffdd02;
    }
`

const Button = ({ children, ...props }) => {
    return (
        <ButtonStyle {...props}>{ children }</ButtonStyle>
    );
};

export default Button;