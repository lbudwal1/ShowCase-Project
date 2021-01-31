import { Server, loading, failed, succeeded, notLoaded } from "../../server";
import { IDeleteCustomerLoadAction, IDeleteCustomerLoadFailedAction, IDeleteCustomerSuccessAction } from "./deleteCustomerActions";
import { IDELETE_CUSTOMER_REQUEST } from "./deleteCustomerConstants";

type Actions =
    | IDeleteCustomerLoadAction
    | IDeleteCustomerSuccessAction
    | IDeleteCustomerLoadFailedAction;

export const DeleteCustomerReducer = (state: Server<string> = notLoaded, action: Actions): Server<string> => {
    switch (action.type) {
        case IDELETE_CUSTOMER_REQUEST.REQUEST:
            return loading;

        case IDELETE_CUSTOMER_REQUEST.SUCCESS:
            return succeeded("Success");
            
        case IDELETE_CUSTOMER_REQUEST.FAILED:
            return failed("Failed");

        default:
            return state;
    }
};