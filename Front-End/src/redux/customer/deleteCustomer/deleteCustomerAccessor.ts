import { IStore } from "../../reducers";
import { Server } from "../../server";

export const getDeleteCustomer = (state: IStore): Server<string> => state.customer.delete;