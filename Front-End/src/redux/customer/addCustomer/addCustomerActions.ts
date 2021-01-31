import { IAddEditCustomerRequest, IADD_CUSTOMER_REQUEST } from "../addCustomer/addCustomerConstants";

export interface IAddCustomerLoadAction {
    type: IADD_CUSTOMER_REQUEST.REQUEST;
    data: IAddEditCustomerRequest;
}
export const addCustomerLoadAction = (data: IAddEditCustomerRequest): IAddCustomerLoadAction => ({
    type: IADD_CUSTOMER_REQUEST.REQUEST,
    data
});
export interface IAddCustomerSuccessAction {
    type: IADD_CUSTOMER_REQUEST.SUCCESS;
    message: string;
}
export const addCustomerLoadSuccessAction = (message: string): IAddCustomerSuccessAction => ({
    type: IADD_CUSTOMER_REQUEST.SUCCESS,
    message
});
export interface IAddCustomerLoadFailedAction {
    type: IADD_CUSTOMER_REQUEST.FAILED;
    message: string;
}
export const addCustomerLoadFailedAction = (message: string): IAddCustomerLoadFailedAction => ({
    type: IADD_CUSTOMER_REQUEST.FAILED,
    message
});
