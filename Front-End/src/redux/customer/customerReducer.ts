import { ById, LaunchCodeApiResponse } from "../../reactComponents/shared/publicInterfaces";
import { Server, loading, failed, succeeded, notLoaded, hasPayload } from "../server";
import { IAddCustomerSuccessAction } from "./addCustomer/addCustomerActions";
import { IADD_CUSTOMER_REQUEST } from "./addCustomer/addCustomerConstants";
import { IDeleteCustomerSuccessAction } from "./deleteCustomer/deleteCustomerActions";
import { IDELETE_CUSTOMER_REQUEST } from "./deleteCustomer/deleteCustomerConstants";
import { IEditCustomerSuccessAction } from "./editCustomer/editCustomerActions";
import { IEDIT_CUSTOMER_REQUEST } from "./editCustomer/editCustomerConstants";
import { ICustomerLoadAction, ICustomerLoadFailedAction, ICustomerSuccessAction } from "./customerActions";
import { IPatient, ICUSTOMER_REQUEST } from "./customerConstants";

type Actions =
    | ICustomerLoadAction
    | ICustomerSuccessAction
    | ICustomerLoadFailedAction
    | IDeleteCustomerSuccessAction
    | IAddCustomerSuccessAction
    | IEditCustomerSuccessAction;

export const CustomerReducer = (state: Server<LaunchCodeApiResponse<ById<IPatient>>> = notLoaded, action: Actions): Server<LaunchCodeApiResponse<ById<IPatient>>> => {
    switch (action.type) {
        case ICUSTOMER_REQUEST.REQUEST:
            return loading;

        case ICUSTOMER_REQUEST.SUCCESS:
            return succeeded(action.list);

        case ICUSTOMER_REQUEST.FAILED:
            return failed(action.message);

        case IDELETE_CUSTOMER_REQUEST.SUCCESS:
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

            
        case IADD_CUSTOMER_REQUEST.SUCCESS:
            return notLoaded;
        
        case IEDIT_CUSTOMER_REQUEST.SUCCESS:
            return notLoaded;

        default:
            return state;
    }
};