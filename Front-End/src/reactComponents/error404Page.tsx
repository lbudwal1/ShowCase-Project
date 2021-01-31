import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { MAIN_COLOR } from "./shared/theme";
import { ROUTE } from "./routes";

const Error404PageStyles = styled.div`
    width: 100%;
    height: 100vh;
    background-color: ${MAIN_COLOR};
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    .container {
        margin: 0 5rem;
        h1, p#heading {
            text-shadow: 0px 0px 6px #fff;
        }
        h1 {
            margin: 0;
            font-size: 25vw;
            -webkit-text-stroke: 2px #000;
        }
        p#heading {
            text-align: center;
            font-size: 4vw;
            margin-top: 0;
        }
        p#text {
            font-size: 16px;
        }
        #link {
            text-decoration: none;
            color: #fff;
            text-decoration: underline;
        }
    }
`;

interface IError404PageProps {
    handleShowHeader: (value: boolean) => void;
}

const Error404Page: React.FC<IError404PageProps> = React.memo((props: IError404PageProps) => {
    useEffect((): (() => void) => {
        props.handleShowHeader(false);
        return (): unknown => props.handleShowHeader(true);
    });
    return <Error404PageStyles>
        <div className="container">
            <h1>404</h1>
            <p id="heading">Sorry, page not found</p>
            <p id="text">You went too deep into the rabbit hole...</p>
            <Link id="link" to={ROUTE.INDEX}>Go back to the homepage, and try again?!</Link>
        </div>
    </Error404PageStyles>;
});

export default Error404Page;
