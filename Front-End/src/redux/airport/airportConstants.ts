import { IPaginationRequest } from "../quote/quoteConstants";

export enum IAIRPORT_REQUEST {
    REQUEST = "airport/AIRPORT_REQUEST",
    SUCCESS = "airport/AIRPORT_SUCCESS",
    FAILED = "airport/AIRPORT_FAILED"
};

export interface IGetAirportRequest extends IPaginationRequest{
    id?: number;
};

export interface IAirportResponse {
   id: number;
   name: string;
   code: string;
   stateCode: string;
   countryCode: string;
   countryName: string;
}
