import { ById, LaunchCodeApiResponse } from "../../reactComponents/shared/publicInterfaces";
import { Server, loading, failed, succeeded, notLoaded, hasPayload } from "../server";
import { IAddQuoteSuccessAction } from "./addQuote/addQuoteActions";
import { IADD_QUOTE_REQUEST } from "./addQuote/addQuoteConstants";
import { IDeleteQuoteSuccessAction } from "./deleteQuote/deleteQuoteActions";
import { IDELETE_QUOTE_REQUEST } from "./deleteQuote/deleteQuoteConstants";
import { IEditQuoteSuccessAction } from "./editQuote/editQuoteActions";
import { IEDIT_QUOTE_REQUEST } from "./editQuote/editQuoteConstants";
import { IQuoteLoadAction, IQuoteLoadFailedAction, IQuoteSuccessAction } from "./quoteActions";
import { IQuoteResponse, IQUOTE_REQUEST } from "./quoteConstants";

type Actions =
    | IQuoteLoadAction
    | IQuoteSuccessAction
    | IQuoteLoadFailedAction
    | IDeleteQuoteSuccessAction
    | IAddQuoteSuccessAction
    | IEditQuoteSuccessAction;

export const QuoteReducer = (state: Server<LaunchCodeApiResponse<ById<IQuoteResponse>>> = notLoaded, action: Actions): Server<LaunchCodeApiResponse<ById<IQuoteResponse>>> => {
    switch (action.type) {
        case IQUOTE_REQUEST.REQUEST:
            return loading;

        case IQUOTE_REQUEST.SUCCESS:
            return succeeded(action.list);

        case IQUOTE_REQUEST.FAILED:
            return failed(action.message);

        case IDELETE_QUOTE_REQUEST.SUCCESS:
            if (hasPayload(state)) {
                const update = state.payload.objectsArray;
                delete update[action.data.id];

                return {
                    ...state,
                    payload: {
                        ...state.payload,
                        objectsArray: {
                            ...state.payload.objectsArray,
                            ...update
                        }
                    }
                }
            }
            return state;

            
        case IADD_QUOTE_REQUEST.SUCCESS:
            return notLoaded;
        
        case IEDIT_QUOTE_REQUEST.SUCCESS:
            return notLoaded;

        default:
            return state;
    }
};