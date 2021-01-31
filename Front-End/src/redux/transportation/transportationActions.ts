import { ITransportationResponse, ITRANSPORTATION_REQUEST } from "./transportationConstants";
import {ById} from "../../reactComponents/shared/publicInterfaces";

export interface ITransportationLoadAction {
    type: ITRANSPORTATION_REQUEST.REQUEST;
}
export const transportationLoadAction = (): ITransportationLoadAction => ({
    type: ITRANSPORTATION_REQUEST.REQUEST
});
export interface ITransportationSuccessAction {
    type: ITRANSPORTATION_REQUEST.SUCCESS;
    list: ById<ITransportationResponse>;
}
export const transportationLoadSuccessAction = (list: ById<ITransportationResponse>): ITransportationSuccessAction => ({
    type: ITRANSPORTATION_REQUEST.SUCCESS,
    list
});
export interface ITransportationLoadFailedAction {
    type: ITRANSPORTATION_REQUEST.FAILED;
    message: string;
}
export const transportationLoadFailedAction = (message: string): ITransportationLoadFailedAction => ({
    type: ITRANSPORTATION_REQUEST.FAILED,
    message
});
