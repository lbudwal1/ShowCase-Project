
import { ActionsObservable, Epic } from "redux-observable";
import { catchError, map, switchMap } from "rxjs/operators";
import { Observable } from "rxjs/internal/Observable";
import Amplify, { Auth } from "aws-amplify";
import { from } from "rxjs";
import { IAction } from "../reducers";
import { webConfig } from "../../utils/webConfig";
import { FORGOT_PASSWORD_REQUEST, IForgotPassword } from "./forgotPasswordConstants";
import { forgotPasswordRequestFailedAction, forgotPasswordRequestSuccessAction, IForgotPasswordRequestLoadAction } from "./forgotPasswordActions";

Amplify.configure(webConfig.awsConfigurations);

const authForgotPasswordRequest = (userInfo: IForgotPassword): Promise<string | undefined> => {
    return Auth.forgotPassword(userInfo.username)
        .then((r) => {
            return undefined;
        })
        .catch((err) => {
            return err.message;
        });
};

export const forgotPasswordRequestEpic: Epic = (
    action$: ActionsObservable<IForgotPasswordRequestLoadAction>
): Observable<IAction> => 
    action$.ofType(FORGOT_PASSWORD_REQUEST.REQUEST)
        .pipe(
            switchMap((action: IForgotPasswordRequestLoadAction) => from(authForgotPasswordRequest(action.userInfo))),
            map((response) => {
                if (response) {
                    if (response === "NotAuthorizedException") {
                        return forgotPasswordRequestFailedAction(response);
                    }
                    return forgotPasswordRequestFailedAction(response);
                }
                return forgotPasswordRequestSuccessAction();
            }),
            catchError(() => {
                return ActionsObservable.of(forgotPasswordRequestFailedAction("failed"));
            })
        );
