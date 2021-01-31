import { Server, loading, failed, succeeded, notLoaded } from "../../server";
import { IEditCustomerLoadAction, IEditCustomerLoadFailedAction, IEditCustomerSuccessAction } from "./editCustomerActions";
import { IEDIT_CUSTOMER_REQUEST } from "./editCustomerConstants";

type Actions =
    | IEditCustomerLoadAction
    | IEditCustomerSuccessAction
    | IEditCustomerLoadFailedAction;

export const EditCustomerReducer = (state: Server<string> = notLoaded, action: Actions): Server<string> => {
    switch (action.type) {
        case IEDIT_CUSTOMER_REQUEST.REQUEST:
            return loading;

        case IEDIT_CUSTOMER_REQUEST.SUCCESS:
            return succeeded("Success");
            

        case IEDIT_CUSTOMER_REQUEST.FAILED:
            return failed("Failed");

        default:
            return state;
    }
};