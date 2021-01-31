import React, { PureComponent, ReactNode } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { getLoginInfo, getTokenExpiryTimings } from "../redux/login/loginAccessors";
import { loginRequest } from "../redux/login/loginActions";
import { ILoginRequest, ILogin } from "../redux/login/loginConstants";
import { newPasswordRequirdMessage } from "../redux/login/loginEpics";
import { SILENT_LOGIN_FAILED_MESSAGE } from "../redux/login/loginReducer";
import { IStore, IDispatch } from "../redux/reducers";
import { payloadOrUndefined, Server, STATUS_ENUM, Validation } from "../redux/server";
import { IAuth, getTokenStatus, TOKEN_STATUS } from "../utils/authUtils";
import { ROUTE } from "./routes";
import LATextField, { REQUIRED } from "./shared/textField";
import { LALoadingButton } from './shared/loadingButton';
import PasswordTextField from './shared/passwordTextField';
import LAErrorBox from "./shared/errorBox";
import LAGrid from "./shared/grid";
import LAGridItem from "./shared/gridList";
import { LAPaperWithPadding } from "./shared/paper";

interface ILoginState {
    login: ILoginRequest;
    validation: Validation<ILoginRequest>;
    changePasswordField: boolean;
    newPassword: string;
}

interface ILoginStoreProps {
    tokenExpiryTimings: Server<IAuth>;
    loginInfo: Server<ILogin>;
}

interface ILoginDispatchProps {
    loginRequest: (login: ILoginRequest, newPassword: string) => unknown;
}

type ILoginProps =
    RouteComponentProps &
    ILoginStoreProps &
    ILoginDispatchProps;


const loginFailedMessage = "Invalid login, please check your email/username and password and try again.";

class Login extends PureComponent<ILoginProps, ILoginState> {
    public constructor(props: ILoginProps) {
        super(props);
        this.state = {

            login: {
                username: "tech@truckpartsinventory.com",
                password: "Password12"
            },
            validation: {},
            changePasswordField: false,
            newPassword: ""
        };
    }

    public componentDidMount(): void {
        this.isLoggedIn();
    }

    public componentDidUpdate(): void {
        this.isLoggedIn();

        const checkLogin = this.getLoginStatus();
        if (checkLogin.isNewPasswordRequired === true && this.state.changePasswordField === false) {
            this.setState({ changePasswordField: true });
        }
    }

    public render(): ReactNode {
        const loginStatus = this.getLoginStatus();
        return (
            <LAPaperWithPadding>
                <LAGrid>
                    <LAGridItem xs={12}>
                        <LAPaperWithPadding>
                            {loginStatus.isNewPasswordRequired === false && loginStatus.isNonSilentFailed && <LAErrorBox text={loginFailedMessage} className="mb-3" />}
                            {loginStatus.isNewPasswordRequired && <LAErrorBox text="Please set your new Password" className="mb-3" />}
                            <LATextField
                                id="username"
                                name="username"
                                label="Email/Username"
                                value={this.state.login.username}
                                errorText={this.state.validation.username}
                                disabled={this.state.changePasswordField}
                                required={true}
                                onChange={this.onChange}
                                fullWidth={true}
                                onPressEnter={this.onSubmit}
                                className="mb-3"
                            />
                            <PasswordTextField
                                id="password"
                                name="password"
                                label="Password"
                                value={this.state.login.password}
                                disabled={this.state.changePasswordField}
                                errorText={this.state.validation.password}
                                required={true}
                                onChange={this.onChange}
                                fullWidth={true}
                                onPressEnter={this.onSubmit}
                                className="mb-2"
                            />
                            {this.state.changePasswordField === true &&
                                <PasswordTextField
                                    id="newPassword"
                                    name="newPassword"
                                    label="New Password"
                                    value={this.state.newPassword}
                                    required={true}
                                    onChange={this.newPasswordChange}
                                    fullWidth={true}
                                    onPressEnter={this.onSubmit}
                                    className="mb-2"
                                />
                            }
                            <div className="mb-4">
                                <Link to={ROUTE.FORGOT_PASSWORD}>Forgot your password?</Link>
                            </div>

                            <LALoadingButton
                                label="Login"
                                fullWidth={true}
                                onClick={this.onSubmit}
                                disabled={loginStatus.isLoading}
                                isLoadingStatus={loginStatus.isLoading}
                            />
                            {/* <SharedTwoButtonStyles>
                            <LAButton label="Register" onClick={this.onRegisterClick} />
                            <LALoadingButton
                                label="Login"
                                onClick={this.onSubmit}
                                disabled={loginStatus.isLoading}
                                isLoadingStatus={loginStatus.isLoading}
                            />
                        </SharedTwoButtonStyles> */}
                        </LAPaperWithPadding>
                    </LAGridItem>
                </LAGrid>
            </LAPaperWithPadding>
        );
    }

    private getLoginStatus = (): { isNonSilentFailed: boolean; isLoading: true | undefined, isNewPasswordRequired: boolean } => {
        let isNonSilentFailed = false;
        let isLoading: true | undefined;
        let isNewPasswordRequired = false;
        switch (this.props.loginInfo.kind) {
            case STATUS_ENUM.FAILED:
                isNonSilentFailed = this.props.loginInfo.message !== SILENT_LOGIN_FAILED_MESSAGE;
                isNewPasswordRequired = this.props.loginInfo.message === newPasswordRequirdMessage;
                break;
            case STATUS_ENUM.LOADING:
                isLoading = true;
                break;
            default:
                break;
        }
        return { isNonSilentFailed, isLoading, isNewPasswordRequired };
    };

    private onChange = (name: string, value: string): void => {
        this.setState((state) => ({
            ...state,
            login: {
                ...state.login,
                [name]: value
            },
            validation: {
                ...state.validation,
                [name]: value ? "" : REQUIRED
            }
        }));
    };

    private newPasswordChange = (name: string, value: string): void => {
        this.setState({ newPassword: value });
    }

    private onSubmit = (): void => {
        const { username, password } = this.state.login;
        if (username && password) {
            this.props.loginRequest({ username, password }, this.state.newPassword);
        } else {
            this.setState({
                validation: {
                    username: REQUIRED,
                    password: REQUIRED
                }
            });
        }

        // openAllIndexDBDatabases();
    };

    private isLoggedIn = (): void => {
        const payload = payloadOrUndefined(this.props.tokenExpiryTimings);
        const tokenStatus = getTokenStatus(payload);
        if (tokenStatus !== TOKEN_STATUS.INVALID) {
            this.props.history.push(ROUTE.INDEX);
        }
    };
}

const mapStateToProps = (state: IStore): ILoginStoreProps => ({
    loginInfo: getLoginInfo(state),
    tokenExpiryTimings: getTokenExpiryTimings(state)
});

const mapDispatchToProps = (dispatch: IDispatch): ILoginDispatchProps => ({
    loginRequest: (login: ILoginRequest, newPassword: string): unknown => dispatch(loginRequest(login, newPassword))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
