import React, {PureComponent, ReactNode} from "react";
import { connect } from "react-redux";
import { IDispatch } from "../redux/reducers";
import { logoutAction, flushDataRequestAction } from "../redux/login/loginActions";
import { LARedButton } from "./shared/buttons";
import { LogOutIcon } from "./shared/icons";
import {  WHITE_COLOR } from "./shared/theme";
import { HasClass } from "./shared/publicInterfaces";

interface ILogoutButtonDispatchProps {
    logoutAction: () => unknown;
    flushDataRequest: () => unknown;
}

type ILogoutButtonProps = ILogoutButtonDispatchProps & HasClass;

class LogoutButton extends PureComponent<ILogoutButtonProps> {
    public render(): ReactNode {
        return (
            <LARedButton
                startIcon={<LogOutIcon color={WHITE_COLOR} />}
                label="Logout"
                fullWidth={true}
                onClick={this.logout}
                className={this.props.className}
            />
        );
    }

    private logout = (): void => {
        this.props.flushDataRequest();
        this.props.logoutAction();
    };
}

const mapDispatchToProps = (dispatch: IDispatch): ILogoutButtonDispatchProps => ({
    logoutAction: (): unknown => dispatch(logoutAction),
    flushDataRequest: (): unknown => dispatch(flushDataRequestAction())
});

export default connect(null, mapDispatchToProps)(LogoutButton);
