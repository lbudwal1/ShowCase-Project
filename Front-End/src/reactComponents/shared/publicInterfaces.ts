import { ReactNode } from "react";

export interface HasClass {
    className?: string;
}

export interface HasChildren {
    children: ReactNode;
}

export type HasClassAndChildren = HasClass & HasChildren;


export interface ById<T> {
    [id: string]: T;
};

export interface LaunchCodeApiResponse<T> {
    objectsArray: T;
    totalRecords?: number;
    message: string;
}