import { combineEpics, Epic } from "redux-observable";
import { IAction, IStore } from "./reducers";
import { EpicDependencies } from "./store";
import { transportationEpic } from "./transportation/transportationEpic";
import { airportEpic } from "./airport/airportEpic";
import { quoteEpic } from "./quote/quoteEpic";
import { addQuoteEpic } from "./quote/addQuote/addQuoteEpic";
import { editQuoteEpic } from "./quote/editQuote/editQuoteEpic";
import { deleteQuoteEpic } from "./quote/deleteQuote/deleteQuoteEpic";
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
    quoteEpic,
    addQuoteEpic,
    editQuoteEpic,
    deleteQuoteEpic
);
