import { ById, LaunchCodeApiResponse } from "../../reactComponents/shared/publicInterfaces";
import { IStore } from "../reducers";
import { Server } from "../server";
import { IPatient } from "./customerConstants";

export const getCustomers = (state: IStore): Server<LaunchCodeApiResponse<ById<IPatient>>> => state.customer.customers;