import {IStore} from "./reducers";
import { payloadOrUndefined } from "./server";
import { getLoginInfo, getAccessToken } from "./login/loginAccessors";

export const ajaxHeadersFromState = (state: IStore): object => {
    const payload = payloadOrUndefined(getLoginInfo(state));
    if (payload) {
        return {
            "Authorization": `Bearer ${getAccessToken(payload)}`
        };
    }
    return {};
};

export const ajaxHeadersFromStore = (theStore: IStore): object => {
    if (!theStore) {
        throw new Error("The store is not initialized");
    }
    return ajaxHeadersFromState(theStore);
};

export const withJsonContentType = (obj: object): object => ({
    ...obj,
    "Content-Type": "application/json;charset=utf-8"
});