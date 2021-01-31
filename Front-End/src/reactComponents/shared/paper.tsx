import React from "react";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import { DEFAULT_BOX_SHADOW, DARK_GREY_COLOR } from "./theme";
import { HasClassAndChildren } from "./publicInterfaces";

const LAPaperWithPaddingStyles = styled(Paper)`
    padding: 15px 25px 25px !important;
    position: relative;
    border: 1px solid ${DARK_GREY_COLOR};
    ${DEFAULT_BOX_SHADOW}
`;



interface ILAPaperWithPaddingProps extends HasClassAndChildren {
    changeColorOnHover?: boolean;
}


export const LAPaperWithPadding: React.FC<HasClassAndChildren> = (props: ILAPaperWithPaddingProps) =>
    <LAPaperWithPaddingStyles className={`${props.className}`} elevation={0}>{props.children}</LAPaperWithPaddingStyles>
;