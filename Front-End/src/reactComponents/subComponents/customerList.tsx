import React, { ReactNode, PureComponent } from "react";
import { RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { IDispatch, IStore } from "../../redux/reducers";
import LAGrid from "../shared/grid";
import LAGridItem from "../shared/gridList";
import { ById } from "../shared/publicInterfaces";
import { ICustomerResponse } from "../../redux/customer/customerConstants";
import { LAButton, LAIconButton } from "../shared/buttons";
import { LAPaperWithPadding } from "../shared/paper";
import { DeleteIcon } from "../shared/icons";
import { ROUTE } from "../routes";
import { Server, STATUS_ENUM } from "../../redux/server";
import { IDeleteCustomerRequest } from "../../redux/customer/deleteCustomer/deleteCustomerConstants";
import { getDeleteCustomer } from "../../redux/customer/deleteCustomer/deleteCustomerAccessor";
import { deleteCustomerLoadAction } from "../../redux/customer/deleteCustomer/deleteCustomerActions";
import { MAIN_COLOR } from "../shared/theme";
import LAErrorBox from "../shared/errorBox";
import LALoading from "../shared/loading";

interface ICustomerListComponentStoreProps {
    deleteCustomer: Server<string>;
};

interface ICustomerListComponentDispatchProps {
    deleteCustomerRequest: (data: IDeleteCustomerRequest) => unknown;
};

interface ICustomerListOwnProps {
    data: ById<ICustomerResponse>;
    deleted: boolean;
    dataStatus: STATUS_ENUM;
}

interface ICustomerListComponentState {

}


type ICustomerListComponentProps =
    RouteComponentProps
    & ICustomerListOwnProps
    & ICustomerListComponentStoreProps
    & ICustomerListComponentDispatchProps;

class CustomerList extends PureComponent<ICustomerListComponentProps, ICustomerListComponentState> {

    public constructor(props: ICustomerListComponentProps) {
        super(props);
        this.state = {

        };
    }

    public componentDidMount(): void {

    };

    public componentDidUpdate(prevProps: ICustomerListComponentProps): void {

    }

    public render(): ReactNode {

        return (
            <LAGrid alignItems="center" spacing={3} justify="space-around">
                {this.renderData()}
            </LAGrid>
        );
    }

    private renderData = (): JSX.Element => {
        const status = this.props.dataStatus;
        switch (status) {
            case STATUS_ENUM.LOADING:
                return <LAGridItem xs={12}><LALoading className="text-center" message="Loading Customers. Please Wait..." /></LAGridItem>;

            case STATUS_ENUM.FAILED:
                return <LAGridItem xs={12}><LAErrorBox color={MAIN_COLOR} text="Sorry Failed to Load Data. Try to refresh the window..." /></LAGridItem>;

            case STATUS_ENUM.SUCCEEDED:
                return <>
                    {Object.values(this.props.data).length === 0 && <LAGridItem xs={12}>
                        <LAErrorBox text="Sorry No Record Found" />
                    </LAGridItem>}

                    {Object.values(this.props.data).map((x: ICustomerResponse, index: number) => {
                        return (
                            <LAGridItem xs={12} key={index}>
                                <LAPaperWithPadding>
                                    <LAGrid className="text-center" alignItems="center" justify="space-evenly" spacing={1}>

                                        <LAGridItem xs={12} sm={4}>
                                            <strong>ID</strong><br />
                                            <span>{x.id}</span>
                                        </LAGridItem>

                                        <LAGridItem xs={6} sm={4}>
                                            <strong>Name</strong><br />
                                            <span>{x.customer.firstName + " " + x.customer.lastName}</span>
                                        </LAGridItem>

                                        <LAGridItem xs={6} sm={4}>
                                            <strong>Destination</strong><br />
                                            <span>{x.destination.name}</span>
                                        </LAGridItem>

                                        <LAGridItem xs={10} sm={10}>
                                            <LAButton label="View / Edit Details" fullWidth={true} onClick={() => this.onViewDetailClick(x.id)} />
                                        </LAGridItem>

                                        {!this.props.deleted && <LAGridItem xs={2} sm={2}>
                                            <LAIconButton label="Delete" onClick={() => this.onDeleteClick(x.id)} icon={<DeleteIcon color={MAIN_COLOR} />} />
                                        </LAGridItem>}

                                    </LAGrid>
                                </LAPaperWithPadding>
                            </LAGridItem>
                        )
                    })}
                </>

            default:
                return <></>;
        }
    };

    private onViewDetailClick = (id: number): void => {
        this.props.history.push(ROUTE.CUSTOMER.DETAILS(id));
    };

    private onDeleteClick = (id: number): void => {
        this.props.deleteCustomerRequest({ id });
    };

}

const mapStateToProps = (state: IStore): ICustomerListComponentStoreProps => ({
    deleteCustomer: getDeleteCustomer(state)
});

const mapDispatchToProps = (dispatch: IDispatch): ICustomerListComponentDispatchProps => ({
    deleteCustomerRequest: (data: IDeleteCustomerRequest): unknown => dispatch(deleteCustomerLoadAction(data))
});



export default connect(mapStateToProps, mapDispatchToProps)(CustomerList);




