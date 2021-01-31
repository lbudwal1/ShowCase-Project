import { IStore } from "../reducers";
import { failed, loading, notLoaded, payloadOrUndefined, Server, STATUS_ENUM, succeeded } from "../server";
import { ILogin } from "./loginConstants";
import { IAuth } from "../../utils/authUtils";

export const getLoginInfo = (state: IStore): Server<ILogin> => state.login;

export const getCurrentUserPartyId = (state: IStore): number | undefined => {
    const payload = payloadOrUndefined(getLoginInfo(state));
    if (!payload) {
        return undefined;
    }
    return parseInt(payload.signInUserSession.idToken.payload["custom:PartyId"], 10) || undefined;
};

export const getAccessToken = (login: ILogin): string => login.signInUserSession.idToken.jwtToken;

export const getTokenExpiryTimings = (state: IStore): Server<IAuth> => {
    const login = getLoginInfo(state);
    
    switch (login.kind) {
        case STATUS_ENUM.SUCCEEDED:
            return succeeded({
                authTime: login.payload.signInUserSession.idToken.payload.auth_time,
                expiryTime: login.payload.signInUserSession.idToken.payload.exp
            });

        case STATUS_ENUM.NOT_LOADED:
            return notLoaded;
    
        case STATUS_ENUM.LOADING:
            return loading;
            
        case STATUS_ENUM.FAILED:
        default:
            return failed("Access Token's retrieval failed");
    }
};
