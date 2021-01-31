export enum ITRANSPORTATION_REQUEST {
    REQUEST = "transportation/TRANSPORTATION_REQUEST",
    SUCCESS = "transportation/TRANSPORTATION_SUCCESS",
    FAILED = "transportation/TRANSPORTATION_FAILED"
};
export interface ITransportationResponse {
   id: number;
   name: string;
   isActive: boolean;
   dateAdded: string;
   dateModified?: string;
}
