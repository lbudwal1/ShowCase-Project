import React, { PureComponent, ReactNode } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { RouteComponentProps } from "react-router";
import { IStore, IDispatch } from "../redux/reducers";
import { Validation, Server, STATUS_ENUM, isFailed, isSucceeded, isNotLoaded } from "../redux/server";
import LATextField, { REQUIRED } from "./shared/textField";
import { LAButton, SharedTwoButtonStyles } from "./shared/buttons";
import { ROUTE } from "./routes";
import { IForgotPassword, IReSendTemporaryPasswordRequest } from "../redux/forgotPassword/forgotPasswordConstants";
import { forgotPasswordRequestLoadAction, forgotPasswordLoadActionRequest, reSendTemporaryPasswordLoadActionRequest } from "../redux/forgotPassword/forgotPasswordActions";
import { requestOTP, newPasswordChangeStatus, newTemporaryPasswordRequest } from "../redux/forgotPassword/forgotPasswordAccessor";
import LAErrorBox from "./shared/errorBox";
import LALoading from "./shared/loading";
import PasswordTextField from "./shared/passwordTextField";
import { loginRequest } from "../redux/login/loginActions";
import { ILogin, ILoginRequest } from "../redux/login/loginConstants";
import { getLoginInfo } from "../redux/login/loginAccessors";
import { LAPaperWithPadding } from './shared/paper';
import LAGrid from "./shared/grid";
import LAGridItem from "./shared/gridList";

interface IForgotPasswordState {
    userInfo: IForgotPassword;
    validation: Validation<IForgotPassword>;
}

interface IForgotPasswordStoreProps {
    loginInfo: Server<ILogin>;
    forgotPasswordRequestServer: Server<string>;
    forgotPasswordServer: Server<string>;
    reSendTemporaryPasswordServer: Server<string>;
}

interface IForgotPasswordDispatchProps {
    loginRequest: (login: ILoginRequest, newPassword: string) => unknown;
    forgotPasswordRequest: (userInfo: IForgotPassword) => unknown;
    forgotPassword: (userInfo: IForgotPassword) => unknown;
    reSendTemporaryPasswordRequest: (userInfo: IReSendTemporaryPasswordRequest) => unknown;
}

type IForgotProps =
    RouteComponentProps &
    IForgotPasswordStoreProps &
    IForgotPasswordDispatchProps;

const StyledForgotPassword = styled.div`
    .button-wrapped {
        position: relative;
        display: inline;
    }

    .button-progress {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -11px;
        margin-left: -12px;
    }
`;

class ForgotPassword extends PureComponent<IForgotProps, IForgotPasswordState> {
    public constructor(props: IForgotProps) {
        super(props);
        this.state = {
            userInfo: {
                username: "",
                code: "",
                newPassword: ""
            },
            validation: {}
        };
    }

    public componentDidUpdate(): void {
        this.isPasswordChanged();
    }


    public render(): ReactNode {
        const isLoading = this.props.forgotPasswordRequestServer.kind === STATUS_ENUM.LOADING || undefined;
        let message: string | undefined;
        let success = false;
        if (isFailed(this.props.forgotPasswordRequestServer)) {
            message = this.props.forgotPasswordRequestServer.message;
        } else if (this.props.forgotPasswordRequestServer.kind === STATUS_ENUM.SUCCEEDED) {
            message = "A OTP is sent to your email";
            success = true;
        }
        if (this.props.reSendTemporaryPasswordServer.kind === STATUS_ENUM.SUCCEEDED) {
            message = "New Temporary Password Send to your email.";
            success = true;
        } else if (isFailed(this.props.reSendTemporaryPasswordServer)) {
            message = "Sorry. We are unable to send a new temporary password at the moment.";
        }
        if (isFailed(this.props.forgotPasswordServer)) {
            message = this.props.forgotPasswordServer.message;
        }


        return (
            <LAPaperWithPadding>
                <LAGrid>
                    <LAGridItem xs={12}>
                        <LAPaperWithPadding>
                            <StyledForgotPassword>
                                {message && <LAErrorBox text={message} className="mb-3" />}
                                <LATextField
                                    id="username"
                                    name="username"
                                    label="Email/Username"
                                    value={this.state.userInfo.username}
                                    errorText={this.state.validation.username}
                                    required={true}
                                    onChange={this.onChange}
                                    fullWidth={true}
                                    className="mb-3"
                                />
                                {success &&
                                    <div>
                                        <LATextField
                                            id="code"
                                            name="code"
                                            label="Enter Temporary Password which you get in the email"
                                            value={this.state.userInfo.code}
                                            errorText={this.state.validation.username}
                                            required={true}
                                            onChange={this.onChange}
                                            fullWidth={true}
                                            className="mb-3"
                                        />
                                        <PasswordTextField
                                            id="newPassword"
                                            name="newPassword"
                                            label="Enter Your New Password"
                                            value={this.state.userInfo.newPassword}
                                            errorText={this.state.validation.username}
                                            required={true}
                                            onChange={this.onChange}
                                            fullWidth={true}
                                            className="mb-3"
                                        />
                                    </div>
                                }
                                <SharedTwoButtonStyles>
                                    <div className="button-wrapped">
                                        {!success && <LAButton label="Submit" onClick={this.onSubmit} />}
                                        {success && <LAButton label="Change Password" onClick={this.onFinalSubmission} />}
                                        {isLoading && <LALoading className="button-progress" />}
                                    </div>
                                    <LAButton label="Cancel" onClick={this.onBackClick} />
                                </SharedTwoButtonStyles>
                            </StyledForgotPassword>
                        </LAPaperWithPadding>
                    </LAGridItem>
                </LAGrid>
            </LAPaperWithPadding>
        );
    }


    private onChange = (name: string, value: string): void => {
        this.setState((state) => ({
            ...state,
            userInfo: {
                ...state.userInfo,
                [name]: value
            },
            validation: {
                ...state.validation,
                [name]: value ? "" : REQUIRED
            }
        }));
    };

    private onSubmit = (): void => {
        const { username } = this.state.userInfo;
        if (username) {
            this.props.forgotPasswordRequest(this.state.userInfo);
        }

    };

    private onFinalSubmission = (): void => {
        if (this.props.reSendTemporaryPasswordServer.kind === STATUS_ENUM.SUCCEEDED) {
            this.props.loginRequest({ username: this.state.userInfo.username, password: this.state.userInfo.code }, this.state.userInfo.newPassword);
        } else {
            this.props.forgotPassword(this.state.userInfo);
        }
    };

    private onBackClick = (): void => {
        this.props.history.push(ROUTE.LOGIN);
    };

    private isPasswordChanged = (): void => {

        if (isFailed(this.props.forgotPasswordRequestServer)) {
            if (this.props.forgotPasswordRequestServer.message === "User password cannot be reset in the current state."
                && isNotLoaded(this.props.reSendTemporaryPasswordServer)) {
                this.props.reSendTemporaryPasswordRequest({ email: this.state.userInfo.username });
            }
        }

        if (isSucceeded(this.props.loginInfo)) {
            this.props.history.push(ROUTE.LOGIN);
        };

        if (isSucceeded(this.props.forgotPasswordServer)) {
            this.props.history.push(ROUTE.LOGIN);
        };

    };
}

const mapStateToProps = (state: IStore): IForgotPasswordStoreProps => ({
    loginInfo: getLoginInfo(state),
    forgotPasswordRequestServer: requestOTP(state),
    forgotPasswordServer: newPasswordChangeStatus(state),
    reSendTemporaryPasswordServer: newTemporaryPasswordRequest(state)
});

const mapDispatchToProps = (dispatch: IDispatch): IForgotPasswordDispatchProps => ({
    forgotPasswordRequest: (userInfo: IForgotPassword): unknown => dispatch(forgotPasswordRequestLoadAction(userInfo)),
    forgotPassword: (userInfo: IForgotPassword): unknown => dispatch(forgotPasswordLoadActionRequest(userInfo)),
    reSendTemporaryPasswordRequest: (userInfo: IReSendTemporaryPasswordRequest): unknown => dispatch(reSendTemporaryPasswordLoadActionRequest(userInfo)),
    loginRequest: (login: ILoginRequest, newPassword: string): unknown => dispatch(loginRequest(login, newPassword))
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
