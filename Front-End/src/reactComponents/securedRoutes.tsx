import React, { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, Route, Switch } from "react-router";
import { IStore, IDispatch } from "../redux/reducers";
import { ROUTE } from "./routes";
import Error404Page from "./error404Page";
import Header from "./header/header";
import QuoteComponent from "./quoteComponent";
import {QuoteDetailsComponent} from "./securedRoutesFunctions";
import { getTokenExpiryTimings } from "../redux/login/loginAccessors";
import { refreshTokenRequestAction } from "../redux/login/loginActions";
import { Server, STATUS_ENUM } from "../redux/server";
import { getTokenStatus, IAuth, TOKEN_STATUS } from "../utils/authUtils";
import LALoading from "./shared/loading";


interface ISecuredRoutesStoreProps {
    tokenExpiryTimings: Server<IAuth>;
}

interface ISecuredRoutesDispatchProps {
    refreshTokenRequestAction: () => unknown;
}

interface ISecuredRoutesState {
    showHeader: boolean;
    showFooter: boolean;
}

type ISecuredRoutesProps =
    RouteComponentProps &
    ISecuredRoutesDispatchProps &
    ISecuredRoutesStoreProps;

class SecuredRoutes extends Component<ISecuredRoutesProps, ISecuredRoutesState> {
    public constructor(props: ISecuredRoutesProps) {
        super(props);
        this.state = {
            showHeader: true,
            showFooter: true
        };
    }

    public componentDidMount(): void {
        this.isLoggedIn();
    }

    public componentDidUpdate(): void {
        this.isLoggedIn();
    }

    public render(): ReactNode {
        switch (this.props.tokenExpiryTimings.kind) {
            case STATUS_ENUM.SUCCEEDED:
        return (
            <>
                {this.state.showHeader && <Header {...this.props} />}
                <Switch>
                     <Route exact={true} path={ROUTE.INDEX} component={QuoteComponent} />
                    <Route exact={true} path={ROUTE.QUOTE.INDEX} component={QuoteComponent} />
                    <Route exact={true} path={ROUTE.QUOTE.DETAILS()} component={QuoteDetailsComponent} />
                    <Route render={(): ReactNode => <Error404Page handleShowHeader={this.handleShowHeader} />} />
                </Switch>
            </>
        );
        default:
            return <LALoading message="Loading Credentials" className="mt-3" />;
        }
    }

    private handleShowHeader = (showHeader: boolean): void => {
        this.setState({ showHeader });
    };

       // intentional inconsistent returned values
    // eslint-disable-next-line consistent-return
    private isLoggedIn = (): void => {
        switch (this.props.tokenExpiryTimings.kind) {
            case STATUS_ENUM.SUCCEEDED:
                // eslint-disable-next-line no-case-declarations
                const tokenStatus = getTokenStatus(this.props.tokenExpiryTimings.payload);
                if (tokenStatus === TOKEN_STATUS.INVALID) {
                    return this.props.history.push(ROUTE.LOGIN);
                } if (tokenStatus === TOKEN_STATUS.NEED_TO_REFRESH_TOKEN) {
                    if (navigator.onLine) {
                        this.props.refreshTokenRequestAction();
                    }
                }
                break;

            case STATUS_ENUM.NOT_LOADED:
            case STATUS_ENUM.FAILED:
                return this.props.history.push(ROUTE.LOGIN);

            case STATUS_ENUM.LOADING:
            default:
                break;
        }
    };
}

const mapStateToProps = (state: IStore): ISecuredRoutesStoreProps => ({
    tokenExpiryTimings: getTokenExpiryTimings(state)
});

const mapDispatchToProps = (dispatch: IDispatch): ISecuredRoutesDispatchProps => ({
    refreshTokenRequestAction: (): unknown => dispatch(refreshTokenRequestAction)
});


export default connect(mapStateToProps, mapDispatchToProps)(SecuredRoutes);
