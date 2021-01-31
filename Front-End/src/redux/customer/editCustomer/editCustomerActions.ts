import { IAddEditCustomerRequest } from "../addCustomer/addCustomerConstants";
import { IEDIT_CUSTOMER_REQUEST } from "../editCustomer/editCustomerConstants";

export interface IEditCustomerLoadAction {
    type: IEDIT_CUSTOMER_REQUEST.REQUEST;
    data: IAddEditCustomerRequest;
}
export const editCustomerLoadAction = (data: IAddEditCustomerRequest): IEditCustomerLoadAction => ({
    type: IEDIT_CUSTOMER_REQUEST.REQUEST,
    data
});
export interface IEditCustomerSuccessAction {
    type: IEDIT_CUSTOMER_REQUEST.SUCCESS;
    data: IAddEditCustomerRequest;
}
export const editCustomerLoadSuccessAction = (data: IAddEditCustomerRequest): IEditCustomerSuccessAction => ({
    type: IEDIT_CUSTOMER_REQUEST.SUCCESS,
    data
});
export interface IEditCustomerLoadFailedAction {
    type: IEDIT_CUSTOMER_REQUEST.FAILED;
    message: string;
}
export const editCustomerLoadFailedAction = (message: string): IEditCustomerLoadFailedAction => ({
    type: IEDIT_CUSTOMER_REQUEST.FAILED,
    message
});
