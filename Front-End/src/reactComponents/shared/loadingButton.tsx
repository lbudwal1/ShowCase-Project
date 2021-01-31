import React, { ReactNode } from "react";
import styled from "styled-components";
import { LAButton } from "./buttons";
import TPSLoading from "./loading";
import { HasClass } from "./publicInterfaces";

interface ITPSTwoButtonsProps extends HasClass {
    label: string;
    disabled?: true;
    isLoadingStatus?: boolean;
    onClick: () => void;
    endIcon?: ReactNode;
    fullWidth?: true;
}
const StyledButtons = styled.div`
    position: relative;
    display: inline;

    .button-progress {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -11px;
        margin-left: -12px;
    }
`;

export const LALoadingButton = (props: ITPSTwoButtonsProps): JSX.Element =>
    <StyledButtons>
        <LAButton label={props.label} className={props.className} fullWidth={props.fullWidth}
            disabled={props.disabled} onClick={props.onClick} endIcon={props.endIcon}
        />
        {props.isLoadingStatus && <TPSLoading className="button-progress" />}
    </StyledButtons>
    ;