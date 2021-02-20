import React, { ReactNode, PureComponent } from "react";
import { RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { IDispatch, IStore } from "../redux/reducers";
import LAGrid from "./shared/grid";
import LAGridItem from "./shared/gridList";
import { hasPayload, isNotLoaded, Server } from "../redux/server";
import { ById, LaunchCodeApiResponse } from "./shared/publicInterfaces";
import { customerLoadAction } from "../redux/customer/customerActions";
import { getCustomers } from "../redux/customer/customerAccessor";
import { IGetCustomerRequest, IPatient } from "../redux/customer/customerConstants";
import { LAPaperWithPadding } from "./shared/paper";
import styled from "styled-components";
import { MEDIA_QUERY_PHONE } from "./shared/theme";
import CustomerList from "./subComponents/customerList";
import LAPagination from "./shared/pagination";
import { LAIconButton } from "./shared/buttons";
import Switch from "@material-ui/core/Switch";
import { ROUTE } from "./routes";
import { AddIcon } from "./shared/icons";
import RequestStatus from "./shared/requestStatusSnackbar";
import { getAddCustomer } from "../redux/customer/addCustomer/addCustomerAccessor";
import { getEditCustomer } from "../redux/customer/editCustomer/editCustomerAccessor";

interface ICustomerComponentStoreProps {
    customerList: Server<LaunchCodeApiResponse<ById<IPatient>>>;
    addCustomer: Server<string>;
    editCustomer: Server<string>;
};

interface ICustomerComponentDispatchProps {
    customerRequest: (data: IGetCustomerRequest) => unknown;
};

interface ICustomerComponentState {
    data: ById<IPatient>;
    deleted: boolean;
    totalRecords: number;
    currentPage: number;
}


const CustomerStyles = styled.div`
    margin: 40px 20px;
    
    @media only screen and (max-width: ${MEDIA_QUERY_PHONE}) {
        margin: 15px 10px;
     }
`;

type ICustomerComponentProps =
    RouteComponentProps
    & ICustomerComponentStoreProps
    & ICustomerComponentDispatchProps;

class CustomerComponent extends PureComponent<ICustomerComponentProps, ICustomerComponentState> {

    public constructor(props: ICustomerComponentProps) {
        super(props);
        this.state = {
            data: {},
            totalRecords: 0,
            deleted: false,
            currentPage: 1
        };
    }

    public componentDidMount(): void {
        this.setDataToState();
    };

    public componentDidUpdate(prevProps: ICustomerComponentProps): void {
        if (this.props.customerList !== prevProps.customerList) {
            this.setDataToState();
        }
    }

    public render(): ReactNode {
        const { data, deleted, totalRecords, currentPage } = this.state;

        return (
            <CustomerStyles>
                <LAPaperWithPadding>
                    <LAGrid>
                        <LAGridItem xs={12} sm={10}>
                            <LAPagination
                                className="mt-5"
                                currentPage={currentPage}
                                rowsPerPage={20}
                                onPageChange={this.handlePageChange}
                                numberOfItems={totalRecords}
                            />
                        </LAGridItem>

                        <LAGridItem xs={12} sm={2}>
                            <LAIconButton
                                label={!deleted ? "Show Deleted Customers" : "Show Succeeded/Pending Customers"}
                                icon={<Switch checked={deleted} color="primary" onChange={this.onPendingCustomersClick} />}
                            />
                            <LAIconButton
                                label="Add Customer"
                                icon={<AddIcon />}
                                onClick={this.onAddNewClick}
                            />
                        </LAGridItem>

                        <LAGridItem xs={12}>
                            <CustomerList {...this.props} dataStatus={this.props.customerList.kind} data={data} deleted={deleted} />
                        </LAGridItem>
                    </LAGrid>
                </LAPaperWithPadding>
                <RequestStatus requestStatus={this.props.editCustomer.kind} />
                <RequestStatus requestStatus={this.props.addCustomer.kind} />
            </CustomerStyles>
        );
    }

    private handlePageChange = (currentPage?: number, rowsPerPage?: number): void => {
        this.setState({ currentPage: currentPage ?? 1 });
        this.props.customerRequest({ Keywords: "", PageNumber: currentPage, PageSize: 20, deleted: this.state.deleted });
    };

    private onAddNewClick = (): void => {
        this.props.history.push(ROUTE.CUSTOMER.DETAILS());
    };

    private onPendingCustomersClick = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {
        this.setState({ ...this.state, deleted: checked, currentPage: 1 });
        this.props.customerRequest({ Keywords: "", PageNumber: 1, PageSize: 20, deleted: checked });
    }

    private setDataToState = (): void => {
        if (hasPayload(this.props.customerList)) {
            const val = this.props.customerList.payload;
            this.setState({ data: val.objectsArray, totalRecords: val.totalRecords ?? 0 });
        }

        if (isNotLoaded(this.props.customerList)) {
            this.props.customerRequest({ Keywords: "", PageNumber: 1, PageSize: 20, deleted: false });
        }
    };

}

const mapStateToProps = (state: IStore): ICustomerComponentStoreProps => ({
    customerList: getCustomers(state),
    addCustomer: getAddCustomer(state),
    editCustomer: getEditCustomer(state)
});

const mapDispatchToProps = (dispatch: IDispatch): ICustomerComponentDispatchProps => ({
    customerRequest: (data: IGetCustomerRequest): unknown => dispatch(customerLoadAction(data))
});



export default connect(mapStateToProps, mapDispatchToProps)(CustomerComponent);




