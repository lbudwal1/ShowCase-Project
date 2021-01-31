import { LOGIN, ILogin, ILoginRequest, REFRESH_TOKEN, ISignInUserSession, FLUSH_DATA } from "./loginConstants";

export interface ILoginRequestAction {
    type: LOGIN.REQUEST;
    login: ILoginRequest;
    newPassword: string;
}

export const loginRequest = (login: ILoginRequest, newPassword: string): ILoginRequestAction => ({
    type: LOGIN.REQUEST,
    login,
    newPassword
});

export interface ILoginSuccessAction {
    type: LOGIN.SUCCESS;
    login: ILogin;
}

export const loginSuccess = (login: ILogin): ILoginSuccessAction => ({
    type: LOGIN.SUCCESS,
    login
});

export interface ILoginFailedAction {
    type: LOGIN.FAILED;
    message: string;
}

export const loginFailed = (message: string): ILoginFailedAction => ({
    type: LOGIN.FAILED,
    message
});

export interface ILogoutAction {
    type: LOGIN.LOGOUT;
}

export const logoutAction: ILogoutAction = {
    type: LOGIN.LOGOUT,
};

// REFRESH TOKEN

export interface IRefreshTokenRequestAction {
    type: REFRESH_TOKEN.REQUEST;
}

export const refreshTokenRequestAction: IRefreshTokenRequestAction = {
    type: REFRESH_TOKEN.REQUEST,
};

export interface IRefreshTokenSuccessAction {
    type: REFRESH_TOKEN.SUCCESS;
    session: ISignInUserSession;
}

export const refreshTokenSuccessAction = (session: ISignInUserSession): IRefreshTokenSuccessAction => ({
    type: REFRESH_TOKEN.SUCCESS,
    session
});

// FLUSH DATA

export interface IFlushDataRequestAction {
    type: FLUSH_DATA.REQUEST;
}

export const flushDataRequestAction = (): IFlushDataRequestAction => ({
    type: FLUSH_DATA.REQUEST,
});

export interface IFlushDataSuccessAction {
    type: FLUSH_DATA.SUCCESS;
}

export const flushDataSuccessAction = (): IFlushDataSuccessAction => ({
    type: FLUSH_DATA.SUCCESS
});

export interface IFlushDataFailedAction {
    type: FLUSH_DATA.SUCCESS;
}

export const flushDataFailedAction = (): IFlushDataFailedAction => ({
    type: FLUSH_DATA.SUCCESS,
});