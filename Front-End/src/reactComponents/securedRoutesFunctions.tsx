import React from "react";
import { RouteComponentProps } from "react-router";
import QuoteDetails from "./subComponents/quoteDetails";

type QuoteDetailsComponentProps = RouteComponentProps<{ id: string }>;
export const QuoteDetailsComponent: React.FC<QuoteDetailsComponentProps> = (props: QuoteDetailsComponentProps) =>
    <QuoteDetails id={Number(props.match.params.id)} {...props} />;