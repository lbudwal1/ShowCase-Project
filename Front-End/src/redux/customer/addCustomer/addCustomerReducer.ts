import { Server, loading, failed, succeeded, notLoaded } from "../../server";
import { IAddCustomerLoadAction, IAddCustomerLoadFailedAction, IAddCustomerSuccessAction } from "./addCustomerActions";
import { IADD_CUSTOMER_REQUEST } from "./addCustomerConstants";

type Actions =
    | IAddCustomerLoadAction
    | IAddCustomerSuccessAction
    | IAddCustomerLoadFailedAction;

export const AddCustomerReducer = (state: Server<string> = notLoaded, action: Actions): Server<string> => {
    switch (action.type) {
        case IADD_CUSTOMER_REQUEST.REQUEST:
            return loading;

        case IADD_CUSTOMER_REQUEST.SUCCESS:
            return succeeded(action.message);
            
        case IADD_CUSTOMER_REQUEST.FAILED:
            return failed("Failed");

        default:
            return state;
    }
};