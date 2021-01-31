// #region FieldValidation
export interface IFieldErrorKeyValue {
    key: string;
    message: string;
};

export enum FIELD_VALIDATOR_ERRORS {
    REQUIRED = "Required",
    MIN_LEN = "Value can not be less than ",
    MAX_LEN = "Value can not be more than ",
    NUMERIC = "Value has to be numeric",
    DECIMAL = "Value has to be decimal",
    INVALID_EMAIL = "Email address is not valid"
};

export interface IFieldValidatorProps {
    required?: true;
    numeric?: true;
    decimal?: true;
    minLength?: number;
    maxLength?: number;
    email?: true;
};

export const FieldValidator = (value: string, rules: IFieldValidatorProps): string => {
    let errorMessage: string = "";

    //Email Validation
    if(rules.email && (typeof value === "string")){
        if(emailRegex.test(value) === false){
            errorMessage = FIELD_VALIDATOR_ERRORS.INVALID_EMAIL;
        }
    }

    //Minimum Length Check
    if (rules.minLength && (typeof value === "string")) {
        if ((value.length < rules.minLength) && (value.length !== 0)) {
            errorMessage = FIELD_VALIDATOR_ERRORS.MIN_LEN + rules.minLength;
        }
    }

    //MaxLength Check
    if (rules.maxLength && (typeof value === "string")) {
        if (value.length > rules.maxLength) {
            errorMessage = FIELD_VALIDATOR_ERRORS.MAX_LEN + rules.maxLength;
        }
    }

    //Number Check
    if(rules.numeric){
        if(isNaN(Number(value))){
            errorMessage = FIELD_VALIDATOR_ERRORS.NUMERIC
        }
    }

    //Decimal Check
    if(rules.decimal){
        if(isNaN(parseFloat(value)) || Math.floor(parseFloat(value)) === parseFloat(value)){
            errorMessage = FIELD_VALIDATOR_ERRORS.DECIMAL
        }
    }

    //Required Check
    if (rules.required && (typeof value === "string")) {
        if (value.length === 0) {
            errorMessage = FIELD_VALIDATOR_ERRORS.REQUIRED;
        }
    }

    return errorMessage;
};

// eslint-disable-next-line
export const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//#endregion