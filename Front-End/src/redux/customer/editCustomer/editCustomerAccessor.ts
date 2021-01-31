import { IStore } from "../../reducers";
import { Server } from "../../server";

export const getEditCustomer = (state: IStore): Server<string> => state.customer.edit;