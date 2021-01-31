import { IStore } from "../../reducers";
import { Server } from "../../server";

export const getEditQuote = (state: IStore): Server<string> => state.quote.edit;