import {Reducer, combineReducers, Dispatch} from "redux";
import { ById, LaunchCodeApiResponse } from "../reactComponents/shared/publicInterfaces";
import { IAirportResponse } from "./airport/airportConstants";
import { Server } from "./server";
import { ITransportationResponse } from "./transportation/transportationConstants";
import { TransportationReducer } from "./transportation/transportationReducer";
import { AirportReducer } from "./airport/airportReducer";
import { QuoteReducer } from "./quote/quoteReducer";
import { AddQuoteReducer } from "./quote/addQuote/addQuoteReducer";
import { EditQuoteReducer } from "./quote/editQuote/editQuoteReducer";
import { DeleteQuoteReducer } from "./quote/deleteQuote/deleteQuoteReducer";
import { IQuoteResponse } from "./quote/quoteConstants";
import { ILogin } from "./login/loginConstants";
import { loginReducer } from "./login/loginReducer";
import { ForgotPasswordRequestReducer, ForgotPasswordReducer, ReSendTemporaryPasswordReducer } from "./forgotPassword/forgotPasswordReducer";

export interface IAction {
    type: any;
    [key: string]: any;
}

export type ReducerMap<T> = { [K in keyof T]: Reducer<T[K], IAction>; };

export type IDispatch = Dispatch<IAction>;

export interface IStore {
    transportation: Server<ById<ITransportationResponse>>;
    login: Server<ILogin>;
    profile: {
      forgotPassword: {
          forgotPasswordRequest: Server<string>;
          forgotPassword: Server<string>;
      };
      reSendTemporaryPassword: Server<string>;
  };
    quote: {
      quotes: Server<LaunchCodeApiResponse<ById<IQuoteResponse>>>;
      add: Server<string>;
      edit: Server<string>;
      delete: Server<string>;
    },
    airportList: Server<ById<IAirportResponse>>;
}

const reducerMap: ReducerMap<IStore> = {
  transportation: TransportationReducer,
  login: loginReducer,
  profile: combineReducers({
    forgotPassword: combineReducers({
        forgotPasswordRequest: ForgotPasswordRequestReducer,
        forgotPassword: ForgotPasswordReducer,
    }),
    reSendTemporaryPassword: ReSendTemporaryPasswordReducer,
}),
  quote: combineReducers({
    quotes: QuoteReducer,
    add: AddQuoteReducer,
    edit: EditQuoteReducer,
    delete: DeleteQuoteReducer
}),
airportList: AirportReducer
};

export default combineReducers<IStore>(reducerMap);