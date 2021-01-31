import { ById, LaunchCodeApiResponse } from "../../reactComponents/shared/publicInterfaces";
import { IStore } from "../reducers";
import { Server } from "../server";
import { ICustomerResponse } from "./customerConstants";

export const getCustomers = (state: IStore): Server<LaunchCodeApiResponse<ById<ICustomerResponse>>> => state.customer.customers;