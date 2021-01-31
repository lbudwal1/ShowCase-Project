import { ICustomer } from "../quoteConstants";


export enum IADD_QUOTE_REQUEST {
    REQUEST = "addQuote/ADD_QUOTE_REQUEST",
    SUCCESS = "addQuote/ADD_QUOTE_SUCCESS",
    FAILED = "addQuote/ADD_QUOTE_FAILED"
};

export interface IAddEditQuoteRequest {
    id?: number;
    depatureId: number;
    destinationId: number;
    numberOfTravellers: number;
    transportationId: number;
    depatureDate: string;
    returnDate: string;
    customer: ICustomer
};

