import { webConfig } from "../utils/webConfig";

export const END_POINTS = {
    Quotes: {
        TRANSPORTATION: `${webConfig.apiBaseUrl}/api/Transportation/GetTransportation`,
        QUOTE_LIST: `${webConfig.apiBaseUrl}/api/Quote/GetQuotes`,
        ADD_QUOTE: `${webConfig.apiBaseUrl}/api/Quote/AddQuote`,
        EDIT_QUOTE: `${webConfig.apiBaseUrl}/api/Quote/EditQuote`,
        DELETE_QUOTE: `${webConfig.apiBaseUrl}/api/Quote/DeleteQuote`
    },
    AIRPORTS: {
        AIRPORT_LIST: `${webConfig.apiBaseUrl}/api/Aiport/GetAirports`,
    },
    RESEND_TEMPORARY_PASSWORD: `${webConfig.apiBaseUrl}/api/CognitoRegistration/resend-temporary-password`,
};