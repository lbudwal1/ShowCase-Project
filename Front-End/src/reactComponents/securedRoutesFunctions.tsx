import React from "react";
import { RouteComponentProps } from "react-router";
import CustomerDetails from "./subComponents/customerDetails";

type CustomerDetailsComponentProps = RouteComponentProps<{ id: string }>;
export const CustomerDetailsComponent: React.FC<CustomerDetailsComponentProps> = (props: CustomerDetailsComponentProps) =>
    <CustomerDetails id={Number(props.match.params.id)} {...props} />;