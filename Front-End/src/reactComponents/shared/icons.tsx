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

export const headerLogo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBRkFDMUQxMDM3RjYxMUU4QjY3MUE1NjM5RTcyQUE4NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBRkFDMUQxMTM3RjYxMUU4QjY3MUE1NjM5RTcyQUE4NiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkFGQUMxRDBFMzdGNjExRThCNjcxQTU2MzlFNzJBQTg2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkFGQUMxRDBGMzdGNjExRThCNjcxQTU2MzlFNzJBQTg2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+qIhyAAAAAxZJREFUeNrEWD1oVEEQfu+QNEFeYV6RgxCReOChpAhcI2hxwbNIYWEjKVJqYZrAgY2muCaV6OMgZQSxDARRkWgndmehjXAWRzh4QtSTEEOMnJ7fyuw5LO9n1vcOBz72bndn3uzs7Mzsuo4lDQaDWTRXgDmgSDgBHAB7wHvgDfASeOW67i8nT4ICHtAAOgM7ConPl3zHTVFiDM1N4BbABX4AtoEdIAQ+A8eBCeAscAE4x+Z/Ay7DSq//1RqTQIutcp9WWRbyV4B14lO0pBYHrJHFQvo9JhEUkpA+EEhNHSFrnPzMoY+btJamyCFN7AHVHH0vjPKruMlTjKENzOR8EGTK0H62mEVyVcRqm9C5wnykmiL0PCm+q35bKJPuwBRHdkmZIEVgjRTWdMP4WDWr+Rrs+Popx71nmLnExjeob1343QXgCFjmnTqyNoRKD5iT+8AppsifRQmV0a7RGeYaJqScwixNB8+EypQZz6zqWNWrFDAfChTp6yAnVKhNfKsFyr6Kngt4JeZ/iBz01sJlt6mdK1AJoKgrYLwX0fcT+Ei/vwN3LM/PDrXFY0yZUMA4T+0D4Ctl66fAC+q/D6t0IzL/mQRr6e8WHTpaimope7tE8zaN/k0WtT1jrAA8js0/f+OWoiOeLxYFjtbmcYjihKZ6BI8+HBsJcheHOYrlo7ogQHlGtNVHXUXv8Yj5fRpLCqR1ktEqsD2bTiwJXfcJsMe6lCVPasfG2AHfUjRb9Pcaxj4liJ4e+o5NnDFW9I5tkU99PovEyhev2sQZqwjMbwhGoAvIUXWJqYLjgnUEtslNMY5rUldaVrBc17HO2mz+xZg0EJiOnCDDZ5ZsxNUzTaGwu6xIeqRqZ0ufC9hJ9MzBZbbCmjNCUgUYK9BWJDVwaUSKzLACrRV7b6JKjt8OSiNQpM2uvpOSCxy/N9Vy3JoeO/oVKaN5o2xmuFH65Kx9ZpGKrZCsd+0yzd9nMpS8qSyvENeB24JXiAmqjVSuuQScZvNVblKXtSby1I//9T7TIT4v8/uM5cvVF7JSSC9XW5a1sPNbgAEAAEDPGxuB70YAAAAASUVORK5CYII=";
