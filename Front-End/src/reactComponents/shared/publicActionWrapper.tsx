import React from "react";
import styled from "styled-components";
import LAFlushCard from "./card";
import { bigLogo } from "./icons";
import { HasChildren } from "./publicInterfaces";
import { MAIN_COLOR, YELLOW_COLOR } from "./theme";

const StyledPublicPage = styled.div`
    background-color: ${MAIN_COLOR};
    background-repeat: no-repeat;
    background-size: cover;
    position: fixed;
    left: 0;
    right: 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .logo-container {
        background-color: ${YELLOW_COLOR};
        padding: 1rem;
        color: ${MAIN_COLOR};
        display: flex;
        align-items: center;
        justify-content: space-between;
        .logo {
            width: 80px;
        }
        .tps {
            font-size: larger;
            font-weight: bold;
        }
    }

    .wrapper {
        width: ${(props: IStyledPublicPageProps): number => props.width}px;
    }

    .inner-wrapper {
        padding: 3rem;
    }

    .buttons-container {
        display: flex;
        justify-content: space-between;
    }

    @media only screen and (max-height: ${(props: IStyledPublicPageProps): number => props.minHeight}px) {
        position: relative;
        .wrapper {
            height: 100%;
        }
    }

    @media only screen and (max-width: ${(props: IStyledPublicPageProps): number => props.minWidth}px) {
        .inner-wrapper {
            padding-left: 1rem;
            padding-right: 1rem;
        }
        .wrapper {
            width: 100%;
        }
    }
`;

interface IStyledPublicPageProps {
    width: number;
    minWidth: number;
    minHeight: number;
}

interface IPublicActionPageWrapperProps extends IStyledPublicPageProps, HasChildren {
    title: string;
}

const PublicActionPageWrapper = (props: IPublicActionPageWrapperProps): JSX.Element => 
    <StyledPublicPage width={props.width} minWidth={props.minWidth} minHeight={props.minHeight}>
        <LAFlushCard className="wrapper">
            <div className="logo-container">
                <img src={bigLogo} className="logo" alt="logo" title="logo" />
                <h2 className="la-title">{props.title}</h2>
            </div>
            <div className="inner-wrapper">
                {props.children}
            </div>
        </LAFlushCard>
    </StyledPublicPage>
;

export default PublicActionPageWrapper;
