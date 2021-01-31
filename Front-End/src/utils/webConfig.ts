export enum ENVIRONMENT {
    DEVELOPMENT = "development",
    PRODUCTION = "production",
    STAGING = "staging"
}

export interface IWebConfig {
    apiBaseUrl: string;
    environment: ENVIRONMENT;
    awsConfigurations: object;
    isDevMode: boolean;
}

const getEnvNameFromString = (envName?: string): ENVIRONMENT | undefined => {
    switch (envName) {
        case ENVIRONMENT.DEVELOPMENT:
        case ENVIRONMENT.PRODUCTION:
        case ENVIRONMENT.STAGING:
            return envName;
    
        default:
            return undefined;
    }
};

const getWebConfig = (): IWebConfig => {
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const environment = getEnvNameFromString(process.env.REACT_APP_ENVIRONMENT);
    const awsConfigurations = process.env.REACT_APP_AWS_CONFIGURATIONS;

    if (apiBaseUrl && environment && awsConfigurations) {
        return {
            apiBaseUrl,
            environment,
            awsConfigurations: JSON.parse(awsConfigurations),
            isDevMode: environment === ENVIRONMENT.DEVELOPMENT
        };
    } 

    throw new Error("webConfig is missing something. Check your `.env` file and make sure it contains all the environmental variables");
};

export const webConfig: IWebConfig = getWebConfig();
