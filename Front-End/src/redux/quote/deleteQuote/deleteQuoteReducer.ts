import { Server, loading, failed, succeeded, notLoaded } from "../../server";
import { IDeleteQuoteLoadAction, IDeleteQuoteLoadFailedAction, IDeleteQuoteSuccessAction } from "./deleteQuoteActions";
import { IDELETE_QUOTE_REQUEST } from "./deleteQuoteConstants";

type Actions =
    | IDeleteQuoteLoadAction
    | IDeleteQuoteSuccessAction
    | IDeleteQuoteLoadFailedAction;

export const DeleteQuoteReducer = (state: Server<string> = notLoaded, action: Actions): Server<string> => {
    switch (action.type) {
        case IDELETE_QUOTE_REQUEST.REQUEST:
            return loading;

        case IDELETE_QUOTE_REQUEST.SUCCESS:
            return succeeded("Success");
            
        case IDELETE_QUOTE_REQUEST.FAILED:
            return failed("Failed");

        default:
            return state;
    }
};