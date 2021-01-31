
export interface IAuth {
    expiryTime: number;
    authTime: number;
}

export enum TOKEN_STATUS {
    NEED_TO_REFRESH_TOKEN,
    INVALID,
    VALID
}

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const isCurrentTokenExpired = (expiryTime: number): boolean => new Date().getTime() > expiryTime * 1000;

const isRefreshTokenExpired = (authTime: number): boolean => {
    const currentTime = new Date().getTime();
    // https://stackoverflow.com/a/13762981
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const expiryTime = new Date(new Date(authTime * 1000).getTime() + 60 * 60 * 24 * 1000).getTime();
    return currentTime > expiryTime;
};

export const getTokenStatus = (auth: IAuth | undefined): TOKEN_STATUS => {
    if (!auth || isRefreshTokenExpired(auth.authTime)) {
        return TOKEN_STATUS.INVALID;
    }

    if (isCurrentTokenExpired(auth.expiryTime)) {
        return TOKEN_STATUS.NEED_TO_REFRESH_TOKEN;
    }

    return TOKEN_STATUS.VALID;
};
