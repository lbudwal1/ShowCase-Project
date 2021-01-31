import { createMuiTheme } from "@material-ui/core/styles";
import lightBlue from "@material-ui/core/colors/lightBlue";
import orange from "@material-ui/core/colors/orange";

export const APP_NAME = "Launch Code";

// colors
export const RED_COLOR = "#bf0000";
export const MAIN_COLOR = "#e62b24";
export const LIGHT_MAIN_COLOR = `${MAIN_COLOR}10`;
export const LIGHT_GREY_COLOR = "#ececec";
export const DARK_GREY_COLOR = "#ccc";
export const EXTRA_DARK_GREY_COLOR = "#868282";
export const DEFAULT_GREY = "#f5f5f5";
export const WHITE_COLOR = "#fff";
export const BLACK_COLOR ="#1a1c1a";
export const WARNING_COLOR = "#FFCC00";
export const BLUE_COLOR = "#0275d8";
export const LIGHT_BLUE_COLOR = "#7bb2e3";
export const GREEN_COLOR = "#5BBFBA";

// https://material-ui.com/customization/palette/#custom-palette
export const theme = createMuiTheme({
    palette: {
        primary: {
            light: LIGHT_MAIN_COLOR,
            main: MAIN_COLOR,
            dark: "#d8130c",
            contrastText: "#fff"
        },
        secondary: lightBlue,
        error: orange
    }
});

export const MEDIA_QUERY_MATERILUI_SM = 600;

export const MEDIA_QUERY_PHONE_NUMBER = 550;
export const MEDIA_QUERY_PHONE = `${MEDIA_QUERY_PHONE_NUMBER}px`;
export const DEFAULT_BOX_SHADOW = "box-shadow: 0 1px 15px 1px rgba(69, 65, 78, 0.08) !important;";

export const DEFAULT_COLOR_FOR_MATERIAL_UI = "primary";
