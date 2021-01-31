import { webConfig } from "../utils/webConfig";

export const END_POINTS = {
    Customers: {
        TRANSPORTATION: `${webConfig.apiBaseUrl}/api/Transportation/GetTransportation`,
        CUSTOMER_LIST: `${webConfig.apiBaseUrl}/api/Customer/GetCustomers`,
        ADD_CUSTOMER: `${webConfig.apiBaseUrl}/api/Customer/AddCustomer`,
        EDIT_CUSTOMER: `${webConfig.apiBaseUrl}/api/Customer/EditCustomer`,
        DELETE_CUSTOMER: `${webConfig.apiBaseUrl}/api/Customer/DeleteCustomer`
    },
    AIRPORTS: {
        AIRPORT_LIST: `${webConfig.apiBaseUrl}/api/Aiport/GetAirports`,
    },
    RESEND_TEMPORARY_PASSWORD: `${webConfig.apiBaseUrl}/api/CognitoRegistration/resend-temporary-password`,
};