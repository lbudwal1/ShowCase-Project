import { ILogin, LOGIN, REFRESH_TOKEN } from "./loginConstants";
import { ILoginRequestAction, ILoginSuccessAction, ILoginFailedAction, ILogoutAction, IRefreshTokenSuccessAction } from "./loginActions";
import { failed, hasPayload, loading, notLoaded, Server, STATUS_ENUM, succeeded } from "../server";
import LocalStorage from "../../utils/localStorage";

export const DATA_OUT_OF_SYNC = "data out of sync";

type Actions =
| ILoginRequestAction
| ILoginSuccessAction
| ILoginFailedAction
| ILogoutAction
| IRefreshTokenSuccessAction;

export const SILENT_LOGIN_FAILED_MESSAGE = "silentFailed";
const getInitialData = (): Server<ILogin> => {
    const login = LocalStorage.getILogin();
    if (login) {
        return succeeded(login);
    }
    
    return notLoaded;
};
const initialData = getInitialData();

export const loginReducer = (state: Server<ILogin> = initialData, action: Actions): Server<ILogin> => {
    switch (action.type) {
        case LOGIN.REQUEST:
            return loading;
            
        case LOGIN.LOGOUT:
            LocalStorage.logout();
            return failed(SILENT_LOGIN_FAILED_MESSAGE);

        case LOGIN.SUCCESS:
            LocalStorage.setILogin(action.login);
            return succeeded(action.login);
            
        case LOGIN.FAILED:
            return failed(action.message);

        case REFRESH_TOKEN.SUCCESS:
            if (hasPayload(state)) {
                LocalStorage.setRefreshToken(action.session);
                return {
                    kind: STATUS_ENUM.SUCCEEDED,
                    payload: {
                        ...state.payload,
                        signInUserSession: action.session
                    }
                };
            }
            return failed(DATA_OUT_OF_SYNC);
            
        default:
            return state;
    }
};
