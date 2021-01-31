import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { HasClassAndChildren } from "./publicInterfaces";

interface ILAToolTipProps extends HasClassAndChildren {
  title: string;
}

export const LAToolTip: React.FC<ILAToolTipProps> = (props: ILAToolTipProps) =>
<Tooltip title={props.title} aria-label={props.title} className={props.className}>
    <span>
        {props.children}
    </span>
</Tooltip>
;
