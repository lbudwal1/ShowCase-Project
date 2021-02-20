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

export type CountryAbbreviation =
| "us" | "ca" | "af" | "al" | "dz" | "as" | "ad" | "ao" | "ai" | "ag" | "ar" | "am" | "aw" | "au" | "at" | "az" | "bs" | "bh" | "bd" | "bb"
| "by" | "be" | "bz" | "bj" | "bm" | "bt" | "bo" | "ba" | "bw" | "br" | "io" | "vg" | "bn" | "bg" | "bf" | "bi" | "kh" | "cm" | "cv" | "bq"
| "ky" | "cf" | "td" | "cl" | "cn" | "co" | "km" | "cd" | "cg" | "ck" | "cr" | "ci" | "hr" | "cu" | "cw" | "cy" | "cz" | "dk" | "dj" | "dm"
| "do" | "ec" | "eg" | "sv" | "gq" | "er" | "ee" | "et" | "fk" | "fo" | "fj" | "fi" | "fr" | "gf" | "pf" | "ga" | "gm" | "ge" | "de" | "gh"
| "gi" | "gr" | "gl" | "gd" | "gp" | "gu" | "gt" | "gn" | "gw" | "gy" | "ht" | "hn" | "hk" | "hu" | "is" | "in" | "id" | "ir" | "iq" | "ie"
| "il" | "it" | "jm" | "jp" | "jo" | "kz" | "ke" | "ki" | "kw" | "kg" | "la" | "lv" | "lb" | "ls" | "lr" | "ly" | "li" | "lt" | "lu" | "mo"
| "mk" | "mg" | "mw" | "my" | "mv" | "ml" | "mt" | "mh" | "mq" | "mr" | "mu" | "mx" | "fm" | "md" | "mc" | "mn" | "me" | "ms" | "ma" | "mz"
| "mm" | "na" | "nr" | "np" | "nl" | "nc" | "nz" | "ni" | "ne" | "ng" | "nu" | "nf" | "kp" | "mp" | "no" | "om" | "pk" | "pw" | "ps" | "pa"
| "pg" | "py" | "pe" | "ph" | "pl" | "pt" | "pr" | "qa" | "re" | "ro" | "ru" | "rw" | "bl" | "sh" | "kn" | "lc" | "mf" | "pm" | "vc" | "ws"
| "sm" | "st" | "sa" | "sn" | "rs" | "sc" | "sl" | "sg" | "sx" | "sk" | "si" | "sb" | "so" | "za" | "kr" | "ss" | "es" | "lk" | "sd" | "sr"
| "sz" | "se" | "ch" | "sy" | "tw" | "tj" | "tz" | "th" | "tl" | "tg" | "tk" | "to" | "tt" | "tn" | "tr" | "tm" | "tc" | "tv" | "vi" | "ug"
| "ua" | "ae" | "gb" | "uy" | "uz" | "vu" | "va" | "ve" | "vn" | "wf" | "ye" | "zm" | "zw" ;
export enum DOCTOR_TYPE {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    FAMILY= 1,
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    REFERRING = 2,
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    SPECIALIST = 3,
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    INTERPRETING = 4
}

export interface IClinic {
    id: string;
    name: string;
   }

export interface IReferralSource {
    id: string;
    name: string;
}
export enum ADDRESS_TYPE {
    PHYSICAL = "Physical",
    MAILING = "Mailing"
}
export interface IAddress {
    id: string;
    type: string;
    addressLine1: string;
    addressLine2?: string;
    postalArea: string;
    city: string;
    district: string;
    country: string;
}
export interface IEmail {
    id: string;
    type: string;
    address: string;
}
export interface IPhone {
    id: string;
    type: string;
    number: string;
    countryAbbreviation?: CountryAbbreviation;
}
export interface IPartyBase {
    id: string;
    addresses: IAddress[];
    phones: IPhone[];
    emails: IEmail[];
    websites: string[];
}
export interface IPerson extends IPartyBase  {
    firstName: string;
    lastName: string;
    gender: string;
    dateOfBirth: string;
    occupations: string[];
}
export interface ICompany extends IPartyBase  {
    companyName: string;
}
export interface IDoctor extends IPerson {
    type: string;
}
export interface IPatient extends IPerson {
    type: DOCTOR_TYPE;
}
