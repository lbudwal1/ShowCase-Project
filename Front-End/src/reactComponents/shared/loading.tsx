import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { MAIN_COLOR } from "./theme";
import { HasClass } from "./publicInterfaces";

interface ILoadingProps extends HasClass {
    message?: string;
    size?: number;
}

const DEFAULT_LOADING_SIZE = 24;
const LALoadingStyles = { color: MAIN_COLOR };

const LALoading = (props: ILoadingProps): JSX.Element =>
    <div className="text-center">
        <CircularProgress size={props.size || DEFAULT_LOADING_SIZE} className={props.className} />
        {props.message && <div className="mt-2" style={LALoadingStyles}>{props.message}</div>}
    </div>
    ;

export default LALoading;