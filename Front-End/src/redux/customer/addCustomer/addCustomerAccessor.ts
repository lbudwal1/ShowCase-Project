import { IStore } from "../../reducers";
import { Server } from "../../server";

export const getAddCustomer = (state: IStore): Server<string> => state.customer.add;