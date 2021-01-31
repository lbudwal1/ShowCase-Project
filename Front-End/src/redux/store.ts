import {Store, createStore, compose, applyMiddleware} from "redux";
import {createEpicMiddleware} from "redux-observable";
import {ajax, AjaxResponse} from "rxjs/ajax";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import rootEpic from "./epic";
import rootReducer, {IStore} from "./reducers";
import { webConfig } from "../utils/webConfig";

const mapResponse = map((x: AjaxResponse) => x.response);

const post = <T>(url: string, body?: unknown, headers?: object): Observable<T> =>
    mapResponse(
        ajax({
            method: "POST",
            url,
            body,
            headers,
            withCredentials: true
        })
    );

const deleteAjax = (url: string, body?: unknown, headers?: object): Observable<AjaxResponse> =>
    ajax({ method: "DELETE", url, body, headers, withCredentials: true });

const put = (url: string, body?: unknown, headers?: object): Observable<AjaxResponse> =>
    ajax({ method: "PUT", url, body, headers, withCredentials: true });

const patch = (url: string, body?: unknown, headers?: object): Observable<AjaxResponse> =>
    ajax({ method: "PATCH", url, body, headers, withCredentials: true });

const getJSON = <T>(url: string, headers?: object): Observable<T> =>
    mapResponse(
        ajax({
            method: "GET",
            url,
            responseType: "json",
            headers,
            withCredentials: true
        })
    );


export interface EpicDependencies {
    getJSON: typeof getJSON;
    post: typeof post;
    deleteAjax: typeof deleteAjax; // "delete" is a reserved word.
    put: typeof put;
    patch: typeof patch;
};

interface WindowExtension extends Window  {
    __REDUX_DEVTOOLS_EXTENSION__?: () => Function;
}

const configureStore = (): Store<IStore> => {
    const epicMiddleware = createEpicMiddleware({
        dependencies: {
            getJSON,
            post,
            deleteAjax,
            put,
            patch
        }
    });
    
    const windowExtensions = window as WindowExtension;
    const applyMiddlewares = applyMiddleware(epicMiddleware, (store) => (next) => (action): void => {
        try {
            next(action);
        } catch (e) {
            setTimeout(() => {
                throw e;
            });
        }
    });
    /* eslint-disable no-underscore-dangle */
    // __REDUX_DEVTOOLS_EXTENSION__ has underscores in its name
    const store = createStore(
        rootReducer,
        {},
        webConfig.isDevMode && windowExtensions.__REDUX_DEVTOOLS_EXTENSION__
            ? compose(
                applyMiddlewares,
                windowExtensions.__REDUX_DEVTOOLS_EXTENSION__ && windowExtensions.__REDUX_DEVTOOLS_EXTENSION__()
            )
            : applyMiddlewares
    );

    epicMiddleware.run(rootEpic);
    return store;
};

export default configureStore;