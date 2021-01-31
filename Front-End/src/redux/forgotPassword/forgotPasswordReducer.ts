import { Server, notLoaded, loading, failed, succeeded } from "../server";
import { IForgotPasswordRequestLoadAction, IForgotPasswordLoadSuccessAction, IForgotPasswordRequestSuccessAction, IForgotPasswordRequestFailedAction, IForgotPasswordLoadAction, IForgotPasswordLoadFailedAction, IReSendTemporaryPasswordLoadAction, IReSendTemporaryPasswordLoadSuccessAction, IReSendTemporaryPasswordLoadFailedAction } from "./forgotPasswordActions";
import { ONE_TIME_PASSWORD, FORGOT_PASSWORD_REQUEST, RE_SEND_TEMPORARY_PASSWORD } from "./forgotPasswordConstants";
import { FLUSH_DATA } from "../login/loginConstants";
import { IFlushDataSuccessAction } from "../login/loginActions";

type Actions = IForgotPasswordRequestLoadAction
| IForgotPasswordRequestSuccessAction
| IForgotPasswordRequestFailedAction
| IForgotPasswordLoadAction
| IForgotPasswordLoadSuccessAction
| IForgotPasswordLoadFailedAction
| IReSendTemporaryPasswordLoadAction
| IReSendTemporaryPasswordLoadSuccessAction
| IReSendTemporaryPasswordLoadFailedAction
| IFlushDataSuccessAction;

export const ForgotPasswordRequestReducer = (state: Server<string> = notLoaded, action: Actions): Server<string> => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST.REQUEST:
            return loading;

        case FORGOT_PASSWORD_REQUEST.SUCCESS:
            return succeeded("Success");

        case FLUSH_DATA.SUCCESS:
            return notLoaded;

        case FORGOT_PASSWORD_REQUEST.FAILED:
            return failed(action.message);

        default:
            return state;
    }
};

export const ReSendTemporaryPasswordReducer = (state: Server<string> = notLoaded, action: Actions): Server<string> => {
    switch (action.type) {
        case RE_SEND_TEMPORARY_PASSWORD.REQUEST:
            return loading;

        case RE_SEND_TEMPORARY_PASSWORD.SUCCESS:
            return succeeded("succeeded");

        case FLUSH_DATA.SUCCESS:
            return notLoaded;

        case RE_SEND_TEMPORARY_PASSWORD.FAILED:
            return failed(action.message);

        default:
            return state;
    }
};

export const ForgotPasswordReducer = (state: Server<string> = notLoaded, action: Actions): Server<string> => {
    switch (action.type) {
        case ONE_TIME_PASSWORD.REQUEST:
            return loading;

        case ONE_TIME_PASSWORD.SUCCESS:
            return succeeded("succeeded");

        case FLUSH_DATA.SUCCESS:
            return notLoaded;

        case ONE_TIME_PASSWORD.FAILED:
            return failed(action.message);

        default:
            return state;
    }
};

