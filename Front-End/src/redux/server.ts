export type Server<T> =
    | IServerNotLoaded<T>
    | IServerLoading<T>
    | IServerFailed<T>
    | IServerSucceeded<T>
    | IServerCommunicating<T>
    | IServerDataConflicted<T>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface IServerNotLoaded<T> {
    kind: STATUS_ENUM.NOT_LOADED;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface IServerLoading<T> {
    kind: STATUS_ENUM.LOADING;
}

export interface IServerFailed<T> {
    kind: STATUS_ENUM.FAILED;
    payload?: T;
    validation?: Validation<T>;
    message: string;
}

export interface IServerSucceeded<T> {
    kind: STATUS_ENUM.SUCCEEDED;
    payload: T;
}

export interface IServerDataConflicted<T> {
    kind: STATUS_ENUM.DATA_CONFLICT;
    payload: T;
}

export interface IServerCommunicating<T> {
    kind: STATUS_ENUM.COMMUNICATING;
    payload: T;
}

export type ServerArrived<T> = IServerSucceeded<T> | IServerCommunicating<T>;

// Admittedly it is a little odd that a `Server<T>` can be in flight and arrived at the same time,
// but the intention is that `Arrived` means it arrived at least once, and InFlight indicates
// whether there is currently a request in flight.

export type ServerInFlight<T> = IServerLoading<T> | IServerCommunicating<T>;

export type ServerWithPayload<T> =
    | ServerArrived<T>
    | {
        kind: STATUS_ENUM.FAILED;
        payload: T;
        validation?: Validation<T>;
        message: string;
    };

export enum STATUS_ENUM {
    NOT_LOADED = "not loaded",
    LOADING = "loading",
    FAILED = "failed",
    SUCCEEDED = "succeeded",
    COMMUNICATING = "communicating",
    DATA_CONFLICT = "data conflicted"
}

export const STATUS = {
    NOT_LOADED: STATUS_ENUM.NOT_LOADED,
    LOADING: STATUS_ENUM.LOADING,
    FAILED: STATUS_ENUM.FAILED,
    SUCCEEDED: STATUS_ENUM.SUCCEEDED,
    COMMUNICATING: STATUS_ENUM.COMMUNICATING,
    DATA_CONFLICT: STATUS_ENUM.DATA_CONFLICT
};

export type ServerStatus =
    | STATUS_ENUM.NOT_LOADED
    | STATUS_ENUM.LOADING
    | STATUS_ENUM.FAILED
    | STATUS_ENUM.SUCCEEDED
    | STATUS_ENUM.COMMUNICATING
    | STATUS_ENUM.DATA_CONFLICT;

export type Validation<T> = { [Key in keyof T]?: any };

type ExcludeUndefined<T> = Exclude<T, undefined>;

export const notLoaded: IServerNotLoaded<any> = { kind: STATUS_ENUM.NOT_LOADED };

export const loading: IServerLoading<any> = { kind: STATUS_ENUM.LOADING };

export const dataConflicted = <T>(payload: T): IServerDataConflicted<T> => ({
    kind: STATUS_ENUM.DATA_CONFLICT,
    payload
});

export const succeeded = <T>(payload: T): IServerSucceeded<T> => ({
    kind: STATUS_ENUM.SUCCEEDED,
    payload
});

export const communicating = <T>(payload: T): IServerCommunicating<T> => ({
    kind: STATUS_ENUM.COMMUNICATING,
    payload
});

export const failed = <T>(
    message: string,
    payload?: T,
    validation?: Validation<T>
): IServerFailed<T> => ({
    kind: STATUS_ENUM.FAILED,
    payload,
    validation,
    message
});

export const payloadOrUndefined = <T>(s: Server<T> | undefined): T | undefined =>
    s === undefined || s.kind === STATUS_ENUM.NOT_LOADED || s.kind === STATUS_ENUM.LOADING
        ? undefined
        : (s as { payload: T }).payload;

export const toFailed = <T>(
    message: string,
    server?: Server<ExcludeUndefined<T>>,
    validation?: Validation<ExcludeUndefined<T>>
): Server<ExcludeUndefined<T>> => failed(message, payloadOrUndefined(server), validation);

export const isNotLoaded = <T>(s: Server<T>): s is IServerNotLoaded<T> =>
    s.kind === STATUS_ENUM.NOT_LOADED;

export const isDataConflicted = <T>(s: Server<T>): s is IServerDataConflicted<T> =>
    s.kind === STATUS_ENUM.DATA_CONFLICT;

export const isLoading = <T>(s: Server<T>): s is IServerLoading<T> =>
    s.kind === STATUS_ENUM.LOADING;

export const isSucceeded = <T>(s: Server<T>): s is IServerSucceeded<T> =>
    s.kind === STATUS_ENUM.SUCCEEDED;

export const isCommunicating = <T>(s: Server<T>): s is IServerCommunicating<T> =>
    s.kind === STATUS_ENUM.COMMUNICATING;

export const isFailed = <T>(s: Server<T>): s is IServerFailed<T> =>
    s.kind === STATUS_ENUM.FAILED;

export type ArrivedStatus = STATUS_ENUM.SUCCEEDED | STATUS_ENUM.COMMUNICATING;

export const isArrivedStatus = (status?: ServerStatus): status is ArrivedStatus =>
    status === STATUS_ENUM.SUCCEEDED || status === STATUS_ENUM.COMMUNICATING;

export const hasArrived = <T>(s?: Server<T>): s is ServerArrived<T> =>
    s ? isArrivedStatus(s.kind) : false;

export type InFlightStatus = STATUS_ENUM.LOADING | STATUS_ENUM.COMMUNICATING;

export const isInFlight = <T>(s: Server<T>): s is ServerInFlight<T> =>
    s.kind === STATUS_ENUM.LOADING || s.kind === STATUS_ENUM.COMMUNICATING;

export const isInFlightStatus = (status?: ServerStatus): status is InFlightStatus =>
    status === STATUS_ENUM.LOADING || status === STATUS_ENUM.COMMUNICATING;

export const hasPayload = <T>(s?: Server<T>): s is ServerWithPayload<T> =>
    payloadOrUndefined(s) !== undefined;

export const validationOrUndefined = <T>(s: Server<T>): Validation<T> | undefined =>
    s.kind === STATUS_ENUM.FAILED ? s.validation : undefined;

export const validationOrEmpty = <T>(s: Server<T>): Validation<T> =>
    validationOrUndefined(s) || {};
