import { combineEpics, Epic } from "redux-observable";
import { IAction, IStore } from "./reducers";
import { EpicDependencies } from "./store";
import { transportationEpic } from "./transportation/transportationEpic";
import { airportEpic } from "./airport/airportEpic";
import { customerEpic } from "./customer/customerEpic";
import { addCustomerEpic } from "./customer/addCustomer/addCustomerEpic";
import { editCustomerEpic } from "./customer/editCustomer/editCustomerEpic";
import { deleteCustomerEpic } from "./customer/deleteCustomer/deleteCustomerEpic";
import loginEpics from "./login/loginEpics";
import { forgotPasswordEpic } from './forgotPassword/forgotPasswordEpic';
import { forgotPasswordRequestEpic } from './forgotPassword/forgotPasswordRequestEpic';

export type IEpic = Epic<IAction, IAction, IStore, EpicDependencies>;

export default combineEpics(
    loginEpics,
    forgotPasswordEpic,
    forgotPasswordRequestEpic,
    transportationEpic,
    airportEpic,
    customerEpic,
    addCustomerEpic,
    editCustomerEpic,
    deleteCustomerEpic
);
