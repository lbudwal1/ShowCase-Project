

export enum IDELETE_CUSTOMER_REQUEST {
    REQUEST = "deleteCustomer/DELETE_CUSTOMER_REQUEST",
    SUCCESS = "deleteCustomer/DELETE_CUSTOMER_SUCCESS",
    FAILED = "deleteCustomer/DELETE_CUSTOMER_FAILED"
};

export interface IDeleteCustomerRequest {
    id: number;
};

