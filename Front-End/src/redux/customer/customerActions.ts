import { IGetCustomerRequest, IPatient, ICUSTOMER_REQUEST } from "./customerConstants";
import {ById, LaunchCodeApiResponse} from "../../reactComponents/shared/publicInterfaces";

export interface ICustomerLoadAction {
    type: ICUSTOMER_REQUEST.REQUEST;
    data: IGetCustomerRequest
}
export const customerLoadAction = (data: IGetCustomerRequest): ICustomerLoadAction => ({
    type: ICUSTOMER_REQUEST.REQUEST,
    data
});

export interface ICustomerSuccessAction {
    type: ICUSTOMER_REQUEST.SUCCESS;
    list: LaunchCodeApiResponse<ById<IPatient>>;
}
export const customerLoadSuccessAction = (list: LaunchCodeApiResponse<ById<IPatient>>): ICustomerSuccessAction => ({
    type: ICUSTOMER_REQUEST.SUCCESS,
    list
});
export interface ICustomerLoadFailedAction {
    type: ICUSTOMER_REQUEST.FAILED;
    message: string;
}
export const customerLoadFailedAction = (message: string): ICustomerLoadFailedAction => ({
    type: ICUSTOMER_REQUEST.FAILED,
    message
});
