import React from "react";
import { Switch, Route } from "react-router";
import { ROUTE } from "./routes";
// import Error404Page from "./error404Page";
import SecuredRoutes from "./securedRoutes";
import Login from "./login";
import ForgotPassword from './forgotPassword';

const Main: React.FC = () => {
    return <Switch>
        <Route exact={true} path={ROUTE.LOGIN} component={Login} />
        <Route exact={true} path={ROUTE.FORGOT_PASSWORD} component={ForgotPassword} />
        <Route path={ROUTE.INDEX} component={SecuredRoutes} />
        {/* <Route component={Error404Page} /> */}
    </Switch>;
};

export default Main;
