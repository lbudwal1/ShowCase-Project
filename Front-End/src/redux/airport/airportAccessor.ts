import { ById } from "../../reactComponents/shared/publicInterfaces";
import { IStore } from "../reducers";
import { Server } from "../server";
import { IAirportResponse } from "./airportConstants";

export const getAirports = (state: IStore): Server<ById<IAirportResponse>> => state.airportList;