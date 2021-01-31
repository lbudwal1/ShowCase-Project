import React from "react";
import Snackbar, { SnackbarOrigin } from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import { HasClass } from "./publicInterfaces";
import { MAIN_COLOR } from "./theme";

interface ILASnackBarProps extends HasClass {
    open: boolean;
    handleClose: () => void;
    message: string;
    autoHideDuration?: number;
    onExit?: () => void;
    loadingBar: boolean;
    action?: JSX.Element;
    position?: SnackbarOrigin;
    userName?: string;
}

const defaultPosition: SnackbarOrigin = {
    vertical: "bottom",
    horizontal: "left"
};

const StyledLoadingPaper = styled.div`
position: fixed;
z-index: 99999;

    p {
        font-size: 15px;
    }

    .loading:after {
        content: ' .';
        animation: dots 1s steps(5, end) infinite;
    }
      
    .userName {
        color: ${MAIN_COLOR};
        text-decoration: underline;
    }

      @keyframes dots {
        0%, 20% {
          color: rgba(0,0,0,0);
          text-shadow:
            .25em 0 0 rgba(0,0,0,0),
            .5em 0 0 rgba(0,0,0,0);}
        40% {
          color: white;
          text-shadow:
            .25em 0 0 rgba(0,0,0,0),
            .5em 0 0 rgba(0,0,0,0);}
        60% {
          text-shadow:
            .25em 0 0 white,
            .5em 0 0 rgba(0,0,0,0);}
        80%, 100% {
          text-shadow:
            .25em 0 0 white,
            .5em 0 0 white;
        }
    }
`;

const LASnackBar = (props: ILASnackBarProps): JSX.Element => 
    <StyledLoadingPaper>
        <Snackbar
            onExit={props.onExit}
            autoHideDuration={props.autoHideDuration}
            anchorOrigin={props.position ?? defaultPosition}
            open={props.open}
            onClose={props.handleClose}
        >
            <SnackbarContent
                message={
                    <div>
                        {props.loadingBar &&
                            <p className="loading">{props.message}</p>
                        }
                        {props.userName &&
                            <strong className="userName">{props.userName}</strong>
                        }
                        {!props.loadingBar &&
                            props.message
                        }
                    </div>
                }
                action={
                    props.loadingBar ? <CircularProgress /> : props.action
                }
            />
        </Snackbar>
    </StyledLoadingPaper>
;

export default LASnackBar;
