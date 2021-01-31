import { IStore } from "../../reducers";
import { Server } from "../../server";

export const getDeleteQuote = (state: IStore): Server<string> => state.quote.delete;