import { ILogin, ISignInUserSession } from "../redux/login/loginConstants";
// import { deleteAllIndexDB } from "../redux/reduxUtils/dexieDB";

const LOGIN_INFO = "iLogin";
const INDEX_DB_INFO = "indexDB";
const extraFieldsAddedByAWS: string[] = [
    "AUTHREFRESH",
    "amplify-signin-with-hostedUI",
    "AUTHTOKEN",
    "CognitoIdentityServiceProvider.10bsl42ccko5603ouk1iekpo3.tech@truckpartsinventory.com.clockDrift",
    "aws.cognito.identity-providers.us-west-2:e433ca32-99b1-458f-aedf-96c5e0fd681e",
    "CognitoIdentityServiceProvider.10bsl42ccko5603ouk1iekpo3.LastAuthUser",
    "AUTHCLAIMS",
    "CognitoIdentityServiceProvider.10bsl42ccko5603ouk1iekpo3.tech@truckpartsinventory.com.idToken",
    "CognitoIdentityServiceProvider.10bsl42ccko5603ouk1iekpo3.tech@truckpartsinventory.com.refreshToken",
    "CognitoIdentityServiceProvider.10bsl42ccko5603ouk1iekpo3.tech@truckpartsinventory.com.userData",
    "CognitoIdentityServiceProvider.10bsl42ccko5603ouk1iekpo3.tech@truckpartsinventory.com.accessToken",
    "currentCompany",
    "aws.cognito.identity-id.us-west-2:e433ca32-99b1-458f-aedf-96c5e0fd681e",
    "Avatar"
];

export enum INDEX_DB_AVAILABILITY {
    UNAVAILABLE = "0",
    AVAILABLE = "1"
}

// intentionally static class defined
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class LocalStorage {
    private static localStorage: Storage = window.localStorage;

    public static setILogin = (login: ILogin): void => {
        LocalStorage.localStorage.setItem(LOGIN_INFO, JSON.stringify(login));
    };

    public static setRefreshToken = (session: ISignInUserSession): void => {
        const login = LocalStorage.getILogin();
        if (login) {
            login.signInUserSession = session;
            LocalStorage.setILogin(login);
        } else { // this should not happen
            LocalStorage.localStorage.setItem(LOGIN_INFO, JSON.stringify(session));
        }
    };

    public static getILogin = (): ILogin | undefined => {
        const login = LocalStorage.localStorage.getItem(LOGIN_INFO);
        if (login) {
            return JSON.parse(login);
        }
        return undefined;
    };

    public static logout = (): void => {
        LocalStorage.removeItem(LOGIN_INFO);
        LocalStorage.removeExtraFieldsAddedByAWS();
        LocalStorage.setIndexDBInfo(INDEX_DB_AVAILABILITY.UNAVAILABLE);
        LocalStorage.clearIndexDBTables();
    };

    public static clearEntireLocalStorageOnLogout = (): void => {
        LocalStorage.clearLocalStorage();
    }

    public static flushData = (): void => {
        LocalStorage.setIndexDBInfo(INDEX_DB_AVAILABILITY.UNAVAILABLE); 
    };
    
    public static setIndexDBInfo = (available: INDEX_DB_AVAILABILITY): void => {
        LocalStorage.localStorage.setItem(INDEX_DB_INFO, available);
    };
    
    public static isIndexDBAvailable = (): boolean => {
        const available = LocalStorage.localStorage.getItem(INDEX_DB_INFO);
        return available === INDEX_DB_AVAILABILITY.AVAILABLE;
    };

    public static removeILogin(): void {
        this.localStorage.removeItem(LOGIN_INFO);
    }

    private static clearLocalStorage = (): void => {
        LocalStorage.localStorage.clear();
    }

    private static removeItem = (name: string): void => {
        LocalStorage.localStorage.removeItem(name);
    };

    private static removeExtraFieldsAddedByAWS = (): void => {
        extraFieldsAddedByAWS.forEach((fieldName) => {
            LocalStorage.removeItem(fieldName);
        });
    };

    private static clearIndexDBTables = (): void => {
        // deleteAllIndexDB();
    };
}

export default LocalStorage;