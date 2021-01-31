export enum FORGOT_PASSWORD_REQUEST {
    REQUEST =  "forgotPasswordRequest/FORGOTPASSWORDREQUEST_REQUEST",
    SUCCESS =  "forgotPasswordRequest/FORGOTPASSWORDREQUEST_SUCCESS",
    FAILED =  "forgotPasswordRequest/FORGOTPASSWORDREQUEST_FAILED"
};

export enum ONE_TIME_PASSWORD {
    REQUEST =  "forgotPassword/FORGOT_PASSWORD_REQUEST",
    SUCCESS =  "forgotPassword/FORGOT_PASSWORD_SUCCESS",
    FAILED =  "forgotPassword/FORGOT_PASSWORD_FAILED"
};

export enum RE_SEND_TEMPORARY_PASSWORD {
    REQUEST =  "reSendTemporaryPassword/RE_SEND_TEMPORARY_PASSWORD_REQUEST",
    SUCCESS =  "reSendTemporaryPassword/RE_SEND_TEMPORARY_PASSWORD_SUCCESS",
    FAILED =  "reSendTemporaryPassword/RE_SEND_TEMPORARY_PASSWORD_FAILED"
};

export interface IReSendTemporaryPasswordRequest {
    email: string;
}

export interface IForgotPassword {
    username: string;
    code: string;
    newPassword: string;
};
