import { ById } from "../../reactComponents/shared/publicInterfaces";
import { Server, loading, failed, succeeded, notLoaded } from "../server";
import { IAirportLoadAction, IAirportLoadFailedAction, IAirportSuccessAction } from "./airportActions";
import { IAirportResponse, IAIRPORT_REQUEST } from "./airportConstants";

type Actions =
    | IAirportLoadAction
    | IAirportSuccessAction
    | IAirportLoadFailedAction;

export const AirportReducer = (state: Server<ById<IAirportResponse>> = notLoaded, action: Actions): Server<ById<IAirportResponse>> => {
    switch (action.type) {
        case IAIRPORT_REQUEST.REQUEST:
            return loading;

        case IAIRPORT_REQUEST.SUCCESS:
            return succeeded(action.list);

        case IAIRPORT_REQUEST.FAILED:
            return failed("Failed");

        default:
            return state;
    }
};