import React, { useEffect } from "react";
import {Provider} from "react-redux";
import {BrowserRouter, Router} from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import {createBrowserHistory} from "history";
import ReactGA from "react-ga";
import configureStore from "./redux/store";
import Main from "./reactComponents/main";
import { theme } from "./reactComponents/shared/theme";
import { webConfig } from "./utils/webConfig";

export const store = configureStore();
const history = createBrowserHistory();


history.listen((location, action) => {
    if (webConfig.isDevMode) {
        console.info(`%cRoute has changed to: ${location.pathname}${location.search}`, "color: #bada55");
    } else {
        ReactGA.pageview(location.pathname + location.search);
    }
});

const App: React.FC = () => {
    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);

    return <Provider store={store}>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Router history={history}>
                    <Main />
                </Router>
            </ThemeProvider>
        </BrowserRouter>
    </Provider>;
};
    

export default App;
