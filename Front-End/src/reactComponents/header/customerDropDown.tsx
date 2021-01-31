import React, { ReactNode, PureComponent } from "react";
import { RouteComponentProps } from "react-router";
import { ROUTE } from "../routes";
import  { LAMenuItem } from "../shared/dropDownMenu";
import { DollarIcon } from "../shared/icons";

type ILAHRMDropDownProps =
RouteComponentProps;

class CustomerDropDown extends PureComponent<ILAHRMDropDownProps> {

    public render(): ReactNode {
        return (
            <LAMenuItem onClick={this.goToCustomer}>
            <DollarIcon />
            <span className="ml-2">
                Customers
            </span>
        </LAMenuItem>
        );
    };

    private goToCustomer = (): void => {
        this.props.history.push(ROUTE.CUSTOMER.INDEX);
    };


}

export default CustomerDropDown;
