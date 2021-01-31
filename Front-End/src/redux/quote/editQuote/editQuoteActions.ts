import { IAddEditQuoteRequest } from "../addQuote/addQuoteConstants";
import { IEDIT_QUOTE_REQUEST } from "../editQuote/editQuoteConstants";

export interface IEditQuoteLoadAction {
    type: IEDIT_QUOTE_REQUEST.REQUEST;
    data: IAddEditQuoteRequest;
}
export const editQuoteLoadAction = (data: IAddEditQuoteRequest): IEditQuoteLoadAction => ({
    type: IEDIT_QUOTE_REQUEST.REQUEST,
    data
});
export interface IEditQuoteSuccessAction {
    type: IEDIT_QUOTE_REQUEST.SUCCESS;
    data: IAddEditQuoteRequest;
}
export const editQuoteLoadSuccessAction = (data: IAddEditQuoteRequest): IEditQuoteSuccessAction => ({
    type: IEDIT_QUOTE_REQUEST.SUCCESS,
    data
});
export interface IEditQuoteLoadFailedAction {
    type: IEDIT_QUOTE_REQUEST.FAILED;
    message: string;
}
export const editQuoteLoadFailedAction = (message: string): IEditQuoteLoadFailedAction => ({
    type: IEDIT_QUOTE_REQUEST.FAILED,
    message
});
