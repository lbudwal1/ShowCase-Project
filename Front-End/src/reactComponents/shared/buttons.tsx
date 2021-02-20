import React, { ReactNode } from "react";
import IconButton from "@material-ui/core/IconButton";
import { HasClass } from "./publicInterfaces";
import { LAToolTip } from "./toolTip";
import Button from "@material-ui/core/Button";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { MAIN_COLOR, WHITE_COLOR } from "./theme";
import styled from "styled-components";
import LAGridItem from "./gridList";
import LAGrid from "./grid";

interface ILAIconButtonProps extends HasClass {
    label: string;
    icon: React.ReactNode;
    disabled?: true;
    anchorRef?: React.RefObject<HTMLButtonElement>;
    // onClick?: () => void;
    onClick?: (event?: React.MouseEvent<HTMLButtonElement> | undefined) => void;
}

export const LAIconButton = (props: ILAIconButtonProps): JSX.Element =>
    <LAToolTip title={props.label} className={props.className}>
        <span>
            <IconButton disabled={props.disabled} onClick={props.onClick} ref={props.anchorRef}>
                {props.icon}
            </IconButton>
        </span>
    </LAToolTip>
    ;


interface ILAButtonProps extends HasClass {
    label: string;
    disabled?: true;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    fullWidth?: true;
    onClick: () => void;
}

const greenTheme = createMuiTheme({
    palette: {
        primary: {
            main: MAIN_COLOR,
            contrastText: WHITE_COLOR
        },
        background: {
            default: MAIN_COLOR
        }
    }
});


export const LAButton: React.FC<ILAButtonProps> = React.memo((props: ILAButtonProps) =>
    <ThemeProvider theme={greenTheme}>
        <Button variant="contained" color="primary" disabled={props.disabled} fullWidth={props.fullWidth} className={props.className} startIcon={props.startIcon} endIcon={props.endIcon} onClick={props.onClick}>
            {props.label}
        </Button>
    </ThemeProvider>
);

export const LARedButton: React.FC<ILAButtonProps> = React.memo((props: ILAButtonProps) =>
    <Button variant="contained" color="primary" disabled={props.disabled} fullWidth={props.fullWidth} className={props.className} startIcon={props.startIcon} endIcon={props.endIcon} onClick={props.onClick}>
        {props.label}
    </Button>
);

export const SharedTwoButtonStyles = styled.div`
    display: flex;
    justify-content: space-between;
    text-align: center;
`;

interface ILASaveAndCancelButtonProps {
    disableSave?: true;
    disableCancel?: true;
    saveIcon?: React.ReactNode;
    cancelIcon?: React.ReactNode;
    cancelStartIcon?: React.ReactNode;
    saveButtonText?: string;
    cancelButtonText?: string;
    fullWidth?: true;
    onSave: () => void;
    onCancel: () => void;
}

export const LASaveAndCancelButton = (props: ILASaveAndCancelButtonProps): JSX.Element => {
    return <SharedTwoButtonStyles>
        <LAGrid>
            <LAGridItem xs={6}>
                <LARedButton label={props.cancelButtonText ?? "Cancel"} disabled={props.disableCancel} fullWidth={props.fullWidth}
                    startIcon={props.cancelIcon} onClick={props.onCancel} />
            </LAGridItem>

            <LAGridItem xs={6}>
                <LAButton label={props.cancelButtonText ?? "Save"} disabled={props.disableSave} fullWidth={props.fullWidth}
                    startIcon={props.saveIcon} onClick={props.onSave} />
            </LAGridItem>
        </LAGrid>
    </SharedTwoButtonStyles>;
};
