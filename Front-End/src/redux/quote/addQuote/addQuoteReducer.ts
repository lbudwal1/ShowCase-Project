import { Server, loading, failed, succeeded, notLoaded } from "../../server";
import { IAddQuoteLoadAction, IAddQuoteLoadFailedAction, IAddQuoteSuccessAction } from "./addQuoteActions";
import { IADD_QUOTE_REQUEST } from "./addQuoteConstants";

type Actions =
    | IAddQuoteLoadAction
    | IAddQuoteSuccessAction
    | IAddQuoteLoadFailedAction;

export const AddQuoteReducer = (state: Server<string> = notLoaded, action: Actions): Server<string> => {
    switch (action.type) {
        case IADD_QUOTE_REQUEST.REQUEST:
            return loading;

        case IADD_QUOTE_REQUEST.SUCCESS:
            return succeeded(action.message);
            
        case IADD_QUOTE_REQUEST.FAILED:
            return failed("Failed");

        default:
            return state;
    }
};