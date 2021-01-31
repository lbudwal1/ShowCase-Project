import { NodeCallback, CognitoRefreshToken } from "amazon-cognito-identity-js";

export enum LOGIN {
    REQUEST =  "login/LOGIN_REQUEST",
    SUCCESS =  "login/LOGIN_SUCCESS",
    FAILED =  "login/LOGIN_FAILED",
    LOGOUT =  "login/LOGOUT_ACTION"
}

export enum REFRESH_TOKEN {
    REQUEST =  "refreshToken/REFRESH_TOKEN_REQUEST",
    SUCCESS =  "refreshToken/REFRESH_TOKEN_SUCCESS",
    FAILED =  "refreshToken/REFRESH_TOKEN_FAILED"
}

export enum FLUSH_DATA {
    REQUEST =  "flushData/FLUSH_DATA_REQUEST",
    SUCCESS =  "flushData/FLUSH_DATA_SUCCESS",
    FAILED =  "flushData/FLUSH_DATA_FAILED"
}

export interface ILoginRequest {
    username: string;
    password: string;
}

export interface ISignInUserSession {
    accessToken: {
        jwtToken: string;
        payload: {
            auth_time: number;
            client_id: string;
            event_id: string;
            exp: number;
            iat: number;
            iss: string;
            jti: string;
            scope: string;
            sub: string;
            token_use: string;
            username: string;
        };
        clockDrift: number;
    };
    idToken: {
        jwtToken: string;
        payload: {
            aud: string;
            auth_time: number;
            "cognito:username": string;
            "custom:BusinessUnitGroupID": string;
            "custom:BusinessUnitID": string;
            "custom:Company": string;
            "custom:Financial": string;
            "custom:HRM": string;
            "custom:Inventory": string;
            "custom:Manufacturing": string;
            "custom:Purchasing": string;
            "custom:Sales": string;
            "custom:PartyId": string;
            email: string;
            email_verified: boolean;
            event_id: string;
            exp: number;
            family_name: string;
            iat: number;
            iss: string;
            name: string;
            phone_number: string;
            sub: string;
            token_use: string;
            zoneinfo: string;
        };
    };
    refreshToken: {
        token: string;
    };
}

export interface ILogin {
    // this is Amazon Cognito types, nothing really we could do about it
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    refreshSession: (refreshToken: CognitoRefreshToken, callback: NodeCallback<any, any>) => void;
    signInUserSession: ISignInUserSession;
    username: string;
    avatar?: string;
    challengeName?: string;
}
