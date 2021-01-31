export const ROUTE = {
    INDEX: "/",
    LOGIN: "/login",
    FORGOT_PASSWORD: "/forgot-password",
    CUSTOMER: {
        INDEX: "/customers",
        DETAILS: (id?: number): string => id ? `/customers/${id}`: "/customers/:id",
        ADD: "/customers/add"
    },
};
