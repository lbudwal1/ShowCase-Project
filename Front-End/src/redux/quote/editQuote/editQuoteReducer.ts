import { Server, loading, failed, succeeded, notLoaded } from "../../server";
import { IEditQuoteLoadAction, IEditQuoteLoadFailedAction, IEditQuoteSuccessAction } from "./editQuoteActions";
import { IEDIT_QUOTE_REQUEST } from "./editQuoteConstants";

type Actions =
    | IEditQuoteLoadAction
    | IEditQuoteSuccessAction
    | IEditQuoteLoadFailedAction;

export const EditQuoteReducer = (state: Server<string> = notLoaded, action: Actions): Server<string> => {
    switch (action.type) {
        case IEDIT_QUOTE_REQUEST.REQUEST:
            return loading;

        case IEDIT_QUOTE_REQUEST.SUCCESS:
            return succeeded("Success");
            

        case IEDIT_QUOTE_REQUEST.FAILED:
            return failed("Failed");

        default:
            return state;
    }
};