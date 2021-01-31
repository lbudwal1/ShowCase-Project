import { IGetQuoteRequest, IQuoteResponse, IQUOTE_REQUEST } from "./quoteConstants";
import {ById, LaunchCodeApiResponse} from "../../reactComponents/shared/publicInterfaces";

export interface IQuoteLoadAction {
    type: IQUOTE_REQUEST.REQUEST;
    data: IGetQuoteRequest
}
export const quoteLoadAction = (data: IGetQuoteRequest): IQuoteLoadAction => ({
    type: IQUOTE_REQUEST.REQUEST,
    data
});

export interface IQuoteSuccessAction {
    type: IQUOTE_REQUEST.SUCCESS;
    list: LaunchCodeApiResponse<ById<IQuoteResponse>>;
}
export const quoteLoadSuccessAction = (list: LaunchCodeApiResponse<ById<IQuoteResponse>>): IQuoteSuccessAction => ({
    type: IQUOTE_REQUEST.SUCCESS,
    list
});
export interface IQuoteLoadFailedAction {
    type: IQUOTE_REQUEST.FAILED;
    message: string;
}
export const quoteLoadFailedAction = (message: string): IQuoteLoadFailedAction => ({
    type: IQUOTE_REQUEST.FAILED,
    message
});
