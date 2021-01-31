import { ById } from "../../reactComponents/shared/publicInterfaces";
import { Server, loading, failed, succeeded, notLoaded } from "../server";
import { ITransportationLoadAction, ITransportationLoadFailedAction, ITransportationSuccessAction } from "./transportationActions";
import { ITransportationResponse, ITRANSPORTATION_REQUEST } from "./transportationConstants";

type Actions =
    | ITransportationLoadAction
    | ITransportationSuccessAction
    | ITransportationLoadFailedAction;

export const TransportationReducer = (state: Server<ById<ITransportationResponse>> = notLoaded, action: Actions): Server<ById<ITransportationResponse>> => {
    switch (action.type) {
        case ITRANSPORTATION_REQUEST.REQUEST:
            return loading;

        case ITRANSPORTATION_REQUEST.SUCCESS:
            return succeeded(action.list);
            

        case ITRANSPORTATION_REQUEST.FAILED:
            return failed(action.message);

        default:
            return state;
    }
};