import { IAirportResponse } from "../airport/airportConstants";

export enum IQUOTE_REQUEST {
    REQUEST = "quote/QUOTE_REQUEST",
    SUCCESS = "quote/QUOTE_SUCCESS",
    FAILED = "quote/QUOTE_FAILED"
};

export interface IGetQuoteRequest extends IPaginationRequest {
    deleted: boolean;
    id?: number;
}

export interface IPaginationRequest {
    Keywords: string;
    PageNumber?: number;
    PageSize?: number;
};


export interface IQuoteResponse {
    id: number;
    quoteStatus?: IQUOTE_STATUS;
    //    CustomerId: number;
    //    DepartureId: number;
    //    DestinationId: number;
    numberOfTravellers: number;
    transportationId: number;
    dateAdded?: string;
    depatureDate: string;
    returnDate: string;
    dateModified?: string;
    customer: ICustomer;
    destination: IAirportResponse;
    depature: IAirportResponse;
};

export enum IQUOTE_STATUS {
    "SUCCEEDED" = 1,
    "PENDING" = 2,
    "DELETED" = 3
};


export interface ICustomer {
    id?: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    address: string;
    dateAdded?: string;
    dateModified?: string;
};

