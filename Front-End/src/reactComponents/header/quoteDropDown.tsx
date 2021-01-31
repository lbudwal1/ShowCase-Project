import React, { ReactNode, PureComponent } from "react";
import { RouteComponentProps } from "react-router";
import { ROUTE } from "../routes";
import  { LAMenuItem } from "../shared/dropDownMenu";
import { DollarIcon } from "../shared/icons";

type ILAHRMDropDownProps =
RouteComponentProps;

class QuoteDropDown extends PureComponent<ILAHRMDropDownProps> {

    public render(): ReactNode {
        return (
            <LAMenuItem onClick={this.goToQuote}>
            <DollarIcon />
            <span className="ml-2">
                Quotes
            </span>
        </LAMenuItem>
        );
    };

    private goToQuote = (): void => {
        this.props.history.push(ROUTE.QUOTE.INDEX);
    };


}

export default QuoteDropDown;
