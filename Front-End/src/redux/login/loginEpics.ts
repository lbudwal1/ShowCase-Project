import { ActionsObservable, Epic, combineEpics } from "redux-observable";
import { catchError, map, switchMap, mergeMap } from "rxjs/operators";
import { Observable } from "rxjs/internal/Observable";
import Amplify, { Auth, Storage } from "aws-amplify";
import { from } from "rxjs";
import { IAction } from "../reducers";
import { webConfig } from "../../utils/webConfig";
import { ILogin, LOGIN, ILoginRequest, REFRESH_TOKEN, ISignInUserSession, FLUSH_DATA } from "../login/loginConstants";
import { ILoginRequestAction, loginSuccess, loginFailed, refreshTokenSuccessAction, IRefreshTokenRequestAction, IFlushDataRequestAction, flushDataSuccessAction, flushDataFailedAction } from "./loginActions";

Amplify.configure(webConfig.awsConfigurations);

const authLogin = async (login: ILoginRequest, newPassword: string): Promise<ILogin | undefined> => {
    try {
        const profile = await Auth.signIn(login);

        if (profile.challengeName === "NEW_PASSWORD_REQUIRED" && newPassword.length > 0) {
            await Auth.completeNewPassword(profile, newPassword, "");
        }

        const user: ILogin = {
            refreshSession: profile.refreshSession,
            signInUserSession: profile.signInUserSession,
            username: profile.username,
            challengeName: profile.challengeName ? profile.challengeName : undefined
        };
        if (profile.challengeName !== "NEW_PASSWORD_REQUIRED") {
            const avatar = await Storage.get(user.username);
            if (typeof avatar === "string") {
                user.avatar = avatar;
            }
        }

        return user;
    } catch (e) {
        return undefined;
    }
};

const refreshToken = async (): Promise<ISignInUserSession | undefined> => {
    const user: ILogin = await Auth.currentAuthenticatedUser();
    const currentSession = await Auth.currentSession();
    return new Promise((resolve, reject): void => {
        user.refreshSession(currentSession.getRefreshToken(), (err, session: ISignInUserSession): void => {
            if (session) {
                resolve(session);
            } else {
                reject();
            }
        });

    });
};


const loginFailedMessage = "Login failed.";
export const newPasswordRequirdMessage = "NEW_PASSWORD_REQUIRED";

const loginEpic: Epic = (
    action$: ActionsObservable<ILoginRequestAction>
): Observable<IAction> =>
    action$.ofType(LOGIN.REQUEST)
        .pipe(
            switchMap((action: ILoginRequestAction) => from(authLogin(action.login, action.newPassword))),
            map((response) => {
                if (response) {
                    if (response.challengeName === "NEW_PASSWORD_REQUIRED") {
                        return loginFailed(newPasswordRequirdMessage);
                    }
                    return loginSuccess(response);
                }
                return loginFailed(loginFailedMessage);
            }),
            catchError(() => ActionsObservable.of(loginFailed(loginFailedMessage)))
        );

const refreshTokenFailedMessage = "Refreshing token failed.";
export const tokenRefreshEpic: Epic = (
    action$: ActionsObservable<IRefreshTokenRequestAction>
): Observable<IAction> =>
    action$.ofType(REFRESH_TOKEN.REQUEST).pipe(
        switchMap((action: IRefreshTokenRequestAction) => from(refreshToken())),
        map((response) => {
            if (response) {
                return refreshTokenSuccessAction(response);
            }
            return loginFailed(refreshTokenFailedMessage);
        }),
        catchError(() => ActionsObservable.of(loginFailed(refreshTokenFailedMessage)))
    );

export default combineEpics(loginEpic, tokenRefreshEpic);


export const flushDataEpic: Epic = (
    action$: ActionsObservable<IFlushDataRequestAction>
): Observable<IAction> =>
    action$.ofType(FLUSH_DATA.REQUEST)
        .pipe(
            mergeMap(() => {
                return ActionsObservable.of(flushDataSuccessAction());
            }),
            catchError(() => {
                return ActionsObservable.of(flushDataFailedAction());
            })
        );
