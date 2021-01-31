import { IAirportResponse } from "../airport/airportConstants";

export enum ICUSTOMER_REQUEST {
    REQUEST = "customer/CUSTOMER_REQUEST",
    SUCCESS = "customer/CUSTOMER_SUCCESS",
    FAILED = "customer/CUSTOMER_FAILED"
};

export interface IGetCustomerRequest extends IPaginationRequest {
    deleted: boolean;
    id?: number;
}

export interface IPaginationRequest {
    Keywords: string;
    PageNumber?: number;
    PageSize?: number;
};


export interface ICustomerResponse {
    id: number;
    customerStatus?: ICUSTOMER_STATUS;
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

export enum ICUSTOMER_STATUS {
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

