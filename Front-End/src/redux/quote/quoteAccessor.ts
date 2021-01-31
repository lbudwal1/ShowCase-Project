import { ById, LaunchCodeApiResponse } from "../../reactComponents/shared/publicInterfaces";
import { IStore } from "../reducers";
import { Server } from "../server";
import { IQuoteResponse } from "./quoteConstants";

export const getQuotes = (state: IStore): Server<LaunchCodeApiResponse<ById<IQuoteResponse>>> => state.quote.quotes;