import React, { ReactNode, PureComponent } from "react";
import { RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { IDispatch, IStore } from "../../redux/reducers";
import LAGrid from "../shared/grid";
import LAGridItem from "../shared/gridList";
import { ById } from "../shared/publicInterfaces";
import { IPatient } from "../../redux/customer/customerConstants";
import { ROUTE } from "../routes";
import { Server, STATUS_ENUM } from "../../redux/server";
import { IDeleteCustomerRequest } from "../../redux/customer/deleteCustomer/deleteCustomerConstants";
import { getDeleteCustomer } from "../../redux/customer/deleteCustomer/deleteCustomerAccessor";
import { deleteCustomerLoadAction } from "../../redux/customer/deleteCustomer/deleteCustomerActions";
import { MAIN_COLOR } from "../shared/theme";
import LAErrorBox from "../shared/errorBox";
import LALoading from "../shared/loading";
import { TableContainer, TableHead, TableCell, TableRow, Paper, Table, TableBody } from "@material-ui/core";


interface ICustomerListComponentStoreProps {
    deleteCustomer: Server<string>;
};

interface ICustomerListComponentDispatchProps {
    deleteCustomerRequest: (data: IDeleteCustomerRequest) => unknown;
};

interface ICustomerListOwnProps {
    data: ById<IPatient>;
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

                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Calories</TableCell>
                                    <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                    <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                    <TableCell align="right">Protein&nbsp;(g)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.values(this.props.data.clients).map((x: IPatient, index: number) => (
                                    <TableRow key={x.id}>
                                        <TableCell component="th" scope="row">
                                            {x.firstName}
                                        </TableCell>
                                        <TableCell align="right">{x.firstName}</TableCell>
                                        <TableCell align="right">{x.firstName}</TableCell>
                                        <TableCell align="right">{x.firstName}</TableCell>
                                        <TableCell align="right">{x.firstName}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
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




