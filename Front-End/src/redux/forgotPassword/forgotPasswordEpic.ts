
import { ActionsObservable, Epic, StateObservable } from "redux-observable";
import { catchError, map, switchMap, mergeMap } from "rxjs/operators";
import { Observable } from "rxjs/internal/Observable";
import Amplify, { Auth } from "aws-amplify";
import { from } from "rxjs";
import { IAction, IStore } from "../reducers";
import { webConfig } from "../../utils/webConfig";
import { IForgotPassword, ONE_TIME_PASSWORD, RE_SEND_TEMPORARY_PASSWORD } from "./forgotPasswordConstants";
import { forgotPasswordLoadFailedAction, forgotPasswordLoadSuccessAction, IForgotPasswordLoadAction, IReSendTemporaryPasswordLoadAction, IReSendTemporaryPasswordLoadSuccessAction, IReSendTemporaryPasswordLoadFailedAction, reSendTemporaryPasswordLoadSuccessAction, reSendTemporaryPasswordLoadFailedAction } from "./forgotPasswordActions";
import { EpicDependencies } from "../store";
import { END_POINTS } from "../../redux/endpoints";
import { withJsonContentType, ajaxHeadersFromStore } from "../epicUtils";

Amplify.configure(webConfig.awsConfigurations);

const authForgotPassword = (userInfo: IForgotPassword): Promise<string | undefined> => {
    const { username } = userInfo;
    const { code } = userInfo;
    const { newPassword } = userInfo;
    return Auth.forgotPasswordSubmit(username, code, newPassword)
        .then(() => {
            return undefined;
        })
        .catch((err) => {
            return err.message;
        });
};


export const forgotPasswordEpic: Epic = (
    action$: ActionsObservable<IForgotPasswordLoadAction>
): Observable<IAction> =>
    action$.ofType(ONE_TIME_PASSWORD.REQUEST)
        .pipe(
            switchMap((action: IForgotPasswordLoadAction) => from(authForgotPassword(action.userInfo))),
            map((response) => {
                if (response) {
                    return forgotPasswordLoadFailedAction(response);
                }
                return forgotPasswordLoadSuccessAction();
            }),
            catchError(() => {
                return ActionsObservable.of(forgotPasswordLoadFailedAction("failed"));
            })
        );

export const reSendTemporaryPasswordEpic: Epic = (
    action$: ActionsObservable<IReSendTemporaryPasswordLoadAction>,
    store: StateObservable<IStore>,
    { post }: EpicDependencies
): Observable<IReSendTemporaryPasswordLoadSuccessAction | IReSendTemporaryPasswordLoadFailedAction> =>
    action$.ofType(RE_SEND_TEMPORARY_PASSWORD.REQUEST)
        .pipe(
            mergeMap((action) =>
                post<string>(
                    END_POINTS.RESEND_TEMPORARY_PASSWORD,
                    action.userInfo,
                    withJsonContentType(ajaxHeadersFromStore(store.value))
                )
                    .pipe(
                        map((response: string): IReSendTemporaryPasswordLoadSuccessAction => {
                            return reSendTemporaryPasswordLoadSuccessAction();
                        }),
                        catchError(() => ActionsObservable.of(reSendTemporaryPasswordLoadFailedAction("Unable to resend your temporary password contact system admin")))
                    )
            )
        );