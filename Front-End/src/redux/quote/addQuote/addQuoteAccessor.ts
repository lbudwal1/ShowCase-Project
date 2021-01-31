import { IStore } from "../../reducers";
import { Server } from "../../server";

export const getAddQuote = (state: IStore): Server<string> => state.quote.add;