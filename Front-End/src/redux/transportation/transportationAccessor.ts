import { ById } from "../../reactComponents/shared/publicInterfaces";
import { IStore } from "../reducers";
import { Server } from "../server";
import { ITransportationResponse } from "./transportationConstants";

export const getTransportations = (state: IStore): Server<ById<ITransportationResponse>> => state.transportation;