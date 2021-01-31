import { IDeleteQuoteRequest, IDELETE_QUOTE_REQUEST } from "../deleteQuote/deleteQuoteConstants";

export interface IDeleteQuoteLoadAction {
    type: IDELETE_QUOTE_REQUEST.REQUEST;
    data: IDeleteQuoteRequest;
}
export const deleteQuoteLoadAction = (data: IDeleteQuoteRequest): IDeleteQuoteLoadAction => ({
    type: IDELETE_QUOTE_REQUEST.REQUEST,
    data
});
export interface IDeleteQuoteSuccessAction {
    type: IDELETE_QUOTE_REQUEST.SUCCESS;
    data: IDeleteQuoteRequest;
}
export const deleteQuoteLoadSuccessAction = (data: IDeleteQuoteRequest): IDeleteQuoteSuccessAction => ({
    type: IDELETE_QUOTE_REQUEST.SUCCESS,
    data
});
export interface IDeleteQuoteLoadFailedAction {
    type: IDELETE_QUOTE_REQUEST.FAILED;
}
export const deleteQuoteLoadFailedAction = (): IDeleteQuoteLoadFailedAction => ({
    type: IDELETE_QUOTE_REQUEST.FAILED
});
