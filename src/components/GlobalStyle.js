import { createGlobalStyle } from "styled-components";
import normalize from 'normalize.css';

export default createGlobalStyle`
    ${normalize}

    *, *:before, *:after {
        box-sizing: border-box;
    }

    body,
    html {
        height: 100%;
        margin: 0;
    }

    body {
        font-family: -apple-system, BlinkMacSystemfont, 'Segoe UI', Roboto,
            Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
        line-height: 1.4;
        overflow-y: hidden;
    }

    a:link,
    a:visited {
        color: #0077cc;
    }

    a:hover,
    a:focus {
        color: #004499;
    }

    code,
    pre {
        max-width: 100%;
    }

    h1 {
        margin: 0;
    }

    #root {
        display: flex;
        flex-wrap: wrap;
        position: relative;
        height: 100vh;
    }
`;
