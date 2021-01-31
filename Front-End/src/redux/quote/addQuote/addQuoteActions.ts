import { IAddEditQuoteRequest, IADD_QUOTE_REQUEST } from "../addQuote/addQuoteConstants";

export interface IAddQuoteLoadAction {
    type: IADD_QUOTE_REQUEST.REQUEST;
    data: IAddEditQuoteRequest;
}
export const addQuoteLoadAction = (data: IAddEditQuoteRequest): IAddQuoteLoadAction => ({
    type: IADD_QUOTE_REQUEST.REQUEST,
    data
});
export interface IAddQuoteSuccessAction {
    type: IADD_QUOTE_REQUEST.SUCCESS;
    message: string;
}
export const addQuoteLoadSuccessAction = (message: string): IAddQuoteSuccessAction => ({
    type: IADD_QUOTE_REQUEST.SUCCESS,
    message
});
export interface IAddQuoteLoadFailedAction {
    type: IADD_QUOTE_REQUEST.FAILED;
    message: string;
}
export const addQuoteLoadFailedAction = (message: string): IAddQuoteLoadFailedAction => ({
    type: IADD_QUOTE_REQUEST.FAILED,
    message
});
