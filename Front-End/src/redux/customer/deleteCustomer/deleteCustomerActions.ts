import { IDeleteCustomerRequest, IDELETE_CUSTOMER_REQUEST } from "../deleteCustomer/deleteCustomerConstants";

export interface IDeleteCustomerLoadAction {
    type: IDELETE_CUSTOMER_REQUEST.REQUEST;
    data: IDeleteCustomerRequest;
}
export const deleteCustomerLoadAction = (data: IDeleteCustomerRequest): IDeleteCustomerLoadAction => ({
    type: IDELETE_CUSTOMER_REQUEST.REQUEST,
    data
});
export interface IDeleteCustomerSuccessAction {
    type: IDELETE_CUSTOMER_REQUEST.SUCCESS;
    data: IDeleteCustomerRequest;
}
export const deleteCustomerLoadSuccessAction = (data: IDeleteCustomerRequest): IDeleteCustomerSuccessAction => ({
    type: IDELETE_CUSTOMER_REQUEST.SUCCESS,
    data
});
export interface IDeleteCustomerLoadFailedAction {
    type: IDELETE_CUSTOMER_REQUEST.FAILED;
}
export const deleteCustomerLoadFailedAction = (): IDeleteCustomerLoadFailedAction => ({
    type: IDELETE_CUSTOMER_REQUEST.FAILED
});
