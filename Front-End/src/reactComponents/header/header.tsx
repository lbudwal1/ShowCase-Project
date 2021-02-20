import React from "react";
import styled from "styled-components";
import { Link, RouteComponentProps } from "react-router-dom";
import { MAIN_COLOR, MEDIA_QUERY_PHONE, APP_NAME } from "../shared/theme";
import { headerLogo} from "../shared/icons";
import { ROUTE } from "../routes";
import CustomerDropDown from "./customerDropDown";
import LogoutButton from './../logoutButton';

const HeaderStyles = styled.div`
    .main-header {
        background-color: #e0e723;
        width: 100%;
        display: flex;
        align-items: center;
        height: 45px;

        .logo-container {
            display: flex;
            align-items: center;
            color: #fff;
            background-color: ${MAIN_COLOR}
            padding: 1rem 2rem;
            margin-right: 1.5rem;
            img {
                margin-right: 1.5rem;
            }
        }

        .right-side {
            margin-left: auto;
            margin-right: 1rem;
        }
    }
    .sub-header {
        display: flex;
        align-items: center;
        background-color: #fff;
        width: 100%;
        height: 45px;
        box-shadow: 0 2px 10px 0 rgba(204, 204, 204, 0.5);
    }

    .logo-img {
        width: 45px;
        height: 45px;
    }

    @media (max-width: ${MEDIA_QUERY_PHONE}) {
        .hide-on-phone, .hide-on-phone * {
            display: none;
        }
        .main-header .logo-container {
            margin-right: 0.5rem;
            padding: 1rem;
        }
        .main-header .logo-container img {
            margin-right: 0;
        }

    }
`;

// temporary, should be deleted before going to production
export const doNothing = (): void => {};

const Header: React.FC<RouteComponentProps> = React.memo((props: RouteComponentProps) =>
    <HeaderStyles>
        <div className="main-header">
            <Link to={ROUTE.INDEX} className="logo-container">
                <img src={headerLogo} className="logo-img" alt="logo" title="logo" />
                <span className="hide-on-phone">{APP_NAME}</span>
            </Link>

            <div className="right-side">
            <LogoutButton />
            </div>

        </div>
        <div className="sub-header">
            <CustomerDropDown {...props} />
        </div>



    </HeaderStyles>
);

export default Header;
