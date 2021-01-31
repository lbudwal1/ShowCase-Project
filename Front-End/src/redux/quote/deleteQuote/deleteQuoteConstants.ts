

export enum IDELETE_QUOTE_REQUEST {
    REQUEST = "deleteQuote/DELETE_QUOTE_REQUEST",
    SUCCESS = "deleteQuote/DELETE_QUOTE_SUCCESS",
    FAILED = "deleteQuote/DELETE_QUOTE_FAILED"
};

export interface IDeleteQuoteRequest {
    id: number;
};

