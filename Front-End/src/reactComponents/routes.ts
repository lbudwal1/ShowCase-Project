export const ROUTE = {
    INDEX: "/",
    LOGIN: "/login",
    FORGOT_PASSWORD: "/forgot-password",
    QUOTE: {
        INDEX: "/quotes",
        DETAILS: (id?: number): string => id ? `/quotes/${id}`: "/quotes/:id",
        ADD: "/quotes/add"
    },
};
