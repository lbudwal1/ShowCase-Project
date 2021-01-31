import Box from "@material-ui/core/Box";
import React from "react";
import { HasClass } from "./publicInterfaces";
import { WHITE_COLOR } from "./theme";

interface ITPSErrorBoxProps extends HasClass {
    text?: string;
    icon?: React.ReactNode;
    color?: React.ReactNode;
}

const LCErrorBox: React.FC<ITPSErrorBoxProps> = (props: ITPSErrorBoxProps) => 
    <Box bgcolor={props.color ? props.color : "error.main"} color={props.color ? WHITE_COLOR : "error.contrastText"} p={2} className={props.className}>
        {props.icon} {props.text} 
    </Box>
;

export default LCErrorBox;