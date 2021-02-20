import React from "react";
// import { Color } from "csstype";
import { HasClass } from "./publicInterfaces";

// to render any SVG in browser with data url
// data:image/svg+xml;utf8,

const DEFAULT_SIZE = 24;


export interface IIconProps extends HasClass {
    width?: number;
    height?: number;
    color?: string;
}

export const CheckIcon = React.memo((props: IIconProps): JSX.Element =>
    <svg xmlns="http://www.w3.org/2000/svg"
        width={props.width || DEFAULT_SIZE}
        height={props.height || DEFAULT_SIZE}
        viewBox="0 0 24 24"
        fill={props.color}
    >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
);

export const DollarIcon = React.memo((props: IIconProps): JSX.Element =>
    <svg xmlns="http://www.w3.org/2000/svg"
        width={props.width || DEFAULT_SIZE}
        height={props.height || DEFAULT_SIZE}
        viewBox="0 0 24 24"
        fill={props.color}
    >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
    </svg>
);


export const DeleteIcon = React.memo((props: IIconProps): JSX.Element =>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.width || DEFAULT_SIZE}
        height={props.height || DEFAULT_SIZE}
        viewBox="0 0 24 24"
        fill={props.color}
    >
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
        <path d="M0 0h24v24H0z" fill="none" />
    </svg>
);

export const ArrowLeftIcon = React.memo((props: IIconProps): JSX.Element =>
    <svg xmlns="http://www.w3.org/2000/svg"
        width={props.width || DEFAULT_SIZE}
        height={props.height || DEFAULT_SIZE}
        viewBox="0 0 24 24"
        fill={props.color}
    >
        <path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z" />
        <path fill="none" d="M0 0h24v24H0z" />
    </svg>
);

export const ArrowRightIcon = React.memo((props: IIconProps): JSX.Element =>
    <svg xmlns="http://www.w3.org/2000/svg"
        width={props.width || DEFAULT_SIZE}
        height={props.height || DEFAULT_SIZE}
        viewBox="0 0 24 24"
        fill={props.color}
    >
        <path d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z" />
        <path fill="none" d="M0 0h24v24H0z" />
    </svg>
);

export const AddIcon = React.memo((props: IIconProps): JSX.Element =>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.width || DEFAULT_SIZE}
        height={props.height || DEFAULT_SIZE}
        viewBox="0 0 24 24"
        fill={props.color}
    >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
    </svg>
);

export const DateIcon = React.memo((props: IIconProps): JSX.Element =>
    <svg xmlns="http://www.w3.org/2000/svg"
        width={props.width || DEFAULT_SIZE}
        height={props.height || DEFAULT_SIZE}
        viewBox="0 0 24 24"
        fill={props.color}
    >
        <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
        <path d="M0 0h24v24H0z" fill="none" />
    </svg>
);

export const ArrowFastForwardIcon = React.memo((props: IIconProps): JSX.Element =>
    <svg xmlns="http://www.w3.org/2000/svg"
        width={props.width || DEFAULT_SIZE}
        height={props.height || DEFAULT_SIZE}
        viewBox="0 0 24 24"
        fill={props.color}
    >
        <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z" />
        <path d="M0 0h24v24H0z" fill="none" />
    </svg>
);

export const ArrowFastRewindIcon = React.memo((props: IIconProps): JSX.Element =>
    <svg xmlns="http://www.w3.org/2000/svg"
        width={props.width || DEFAULT_SIZE}
        height={props.height || DEFAULT_SIZE}
        viewBox="0 0 24 24"
        fill={props.color}
    >
        <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z" />
        <path d="M0 0h24v24H0z" fill="none" />
    </svg>
);

export const Visibility = React.memo((props: IIconProps): JSX.Element =>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.width || DEFAULT_SIZE}
        height={props.height || DEFAULT_SIZE}
        viewBox="0 0 24 24"
        fill={props.color}
    >
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
    </svg>
);

export const VisibilityOff = React.memo((props: IIconProps): JSX.Element =>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.width || DEFAULT_SIZE}
        height={props.height || DEFAULT_SIZE}
        viewBox="0 0 24 24"
        fill={props.color}
    >
        <path
            fill="none"
            d="M0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0z"
        />
        <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.804 11.804 0 001 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
    </svg>
);

export const LogOutIcon = React.memo((props: IIconProps): JSX.Element =>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.width || DEFAULT_SIZE}
        height={props.height || DEFAULT_SIZE}
        viewBox="0 0 24 24"
        fill={props.color}
    >
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z" />
    </svg>
);

export const headerLogo = "data:image/jpeg;base64,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";
