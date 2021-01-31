import { FORGOT_PASSWORD_REQUEST, IForgotPassword, ONE_TIME_PASSWORD, RE_SEND_TEMPORARY_PASSWORD, IReSendTemporaryPasswordRequest } from "./forgotPasswordConstants";

// Request for Email OTP to change password
export interface IForgotPasswordRequestLoadAction {
    type: FORGOT_PASSWORD_REQUEST.REQUEST;
    userInfo: IForgotPassword;
}

export const forgotPasswordRequestLoadAction = (userInfo: IForgotPassword): IForgotPasswordRequestLoadAction => ({
    type: FORGOT_PASSWORD_REQUEST.REQUEST,
    userInfo
});

export interface IForgotPasswordRequestSuccessAction {
    type: FORGOT_PASSWORD_REQUEST.SUCCESS;
}

export const forgotPasswordRequestSuccessAction = (): IForgotPasswordRequestSuccessAction => ({
    type: FORGOT_PASSWORD_REQUEST.SUCCESS,
});

export interface IForgotPasswordRequestFailedAction {
    type: FORGOT_PASSWORD_REQUEST.FAILED;
    message: string;
}

export const forgotPasswordRequestFailedAction = (message: string): IForgotPasswordRequestFailedAction => ({
    type: FORGOT_PASSWORD_REQUEST.FAILED,
    message
});

// Request for Change Password with OTP and New Password
export interface IForgotPasswordLoadAction {
    type: ONE_TIME_PASSWORD.REQUEST;
    userInfo: IForgotPassword;
}

export const forgotPasswordLoadActionRequest = (userInfo: IForgotPassword): IForgotPasswordLoadAction => ({
    type: ONE_TIME_PASSWORD.REQUEST,
    userInfo
});

export interface IForgotPasswordLoadSuccessAction {
    type: ONE_TIME_PASSWORD.SUCCESS;
}

export const forgotPasswordLoadSuccessAction = (): IForgotPasswordLoadSuccessAction => ({
    type: ONE_TIME_PASSWORD.SUCCESS,
});

export interface IForgotPasswordLoadFailedAction {
    type: ONE_TIME_PASSWORD.FAILED;
    message: string;
}

export const forgotPasswordLoadFailedAction = (message: string): IForgotPasswordLoadFailedAction => ({
    type: ONE_TIME_PASSWORD.FAILED,
    message
});


// Request for New Temporary Password
export interface IReSendTemporaryPasswordLoadAction {
    type: RE_SEND_TEMPORARY_PASSWORD.REQUEST;
    userInfo: IReSendTemporaryPasswordRequest;
}

export const reSendTemporaryPasswordLoadActionRequest = (userInfo: IReSendTemporaryPasswordRequest): IReSendTemporaryPasswordLoadAction => ({
    type: RE_SEND_TEMPORARY_PASSWORD.REQUEST,
    userInfo
});

export interface IReSendTemporaryPasswordLoadSuccessAction {
    type: RE_SEND_TEMPORARY_PASSWORD.SUCCESS;
}

export const reSendTemporaryPasswordLoadSuccessAction = (): IReSendTemporaryPasswordLoadSuccessAction => ({
    type: RE_SEND_TEMPORARY_PASSWORD.SUCCESS,
});

export interface IReSendTemporaryPasswordLoadFailedAction {
    type: RE_SEND_TEMPORARY_PASSWORD.FAILED;
    message: string;
}

export const reSendTemporaryPasswordLoadFailedAction = (message: string): IReSendTemporaryPasswordLoadFailedAction => ({
    type: RE_SEND_TEMPORARY_PASSWORD.FAILED,
    message
});
