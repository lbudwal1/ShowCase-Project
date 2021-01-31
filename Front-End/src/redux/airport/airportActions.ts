import { IGetAirportRequest, IAirportResponse, IAIRPORT_REQUEST } from "./airportConstants";
import {ById} from "../../reactComponents/shared/publicInterfaces";

export interface IAirportLoadAction {
    type: IAIRPORT_REQUEST.REQUEST;
    data: IGetAirportRequest
}
export const airportLoadAction = (data: IGetAirportRequest): IAirportLoadAction => ({
    type: IAIRPORT_REQUEST.REQUEST,
    data
});

export interface IAirportSuccessAction {
    type: IAIRPORT_REQUEST.SUCCESS;
    list: ById<IAirportResponse>;
}
export const airportLoadSuccessAction = (list: ById<IAirportResponse>): IAirportSuccessAction => ({
    type: IAIRPORT_REQUEST.SUCCESS,
    list
});
export interface IAirportLoadFailedAction {
    type: IAIRPORT_REQUEST.FAILED;
}
export const airportLoadFailedAction = (): IAirportLoadFailedAction => ({
    type: IAIRPORT_REQUEST.FAILED,
    
});
