import { ICustomer } from "../customerConstants";


export enum IADD_CUSTOMER_REQUEST {
    REQUEST = "addCustomer/ADD_CUSTOMER_REQUEST",
    SUCCESS = "addCustomer/ADD_CUSTOMER_SUCCESS",
    FAILED = "addCustomer/ADD_CUSTOMER_FAILED"
};

export interface IAddEditCustomerRequest {
    id?: number;
    depatureId: number;
    destinationId: number;
    numberOfTravellers: number;
    transportationId: number;
    depatureDate: string;
    returnDate: string;
    customer: ICustomer
};

