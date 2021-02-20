import {Reducer, combineReducers, Dispatch} from "redux";
import { ById, LaunchCodeApiResponse } from "../reactComponents/shared/publicInterfaces";
import { IAirportResponse } from "./airport/airportConstants";
import { Server } from "./server";
import { ITransportationResponse } from "./transportation/transportationConstants";
import { TransportationReducer } from "./transportation/transportationReducer";
import { AirportReducer } from "./airport/airportReducer";
import { CustomerReducer } from "./customer/customerReducer";
import { AddCustomerReducer } from "./customer/addCustomer/addCustomerReducer";
import { EditCustomerReducer } from "./customer/editCustomer/editCustomerReducer";
import { DeleteCustomerReducer } from "./customer/deleteCustomer/deleteCustomerReducer";
import { IPatient } from "./customer/customerConstants";
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
    customer: {
      customers: Server<LaunchCodeApiResponse<ById<IPatient>>>;
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
  customer: combineReducers({
    customers: CustomerReducer,
    add: AddCustomerReducer,
    edit: EditCustomerReducer,
    delete: DeleteCustomerReducer
}),
airportList: AirportReducer
};

export default combineReducers<IStore>(reducerMap);