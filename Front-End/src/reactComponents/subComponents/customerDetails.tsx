import React, { ReactNode, PureComponent } from "react";
import { RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { IDispatch, IStore } from "../../redux/reducers";
import { DOCTOR_TYPE, IGetCustomerRequest, IPatient } from "../../redux/customer/customerConstants";
import { LAPaperWithPadding } from "../shared/paper";
import styled from "styled-components";
import { MEDIA_QUERY_PHONE } from "../shared/theme";
import { ById, LaunchCodeApiResponse } from "../shared/publicInterfaces";
import LAGrid from "../shared/grid";
import LAGridItem from "../shared/gridList";
import LATextField from "../shared/textField";
import { hasPayload, isNotLoaded, Server } from "../../redux/server";
import { customerLoadAction } from "../../redux/customer/customerActions";
import { getCustomers } from "../../redux/customer/customerAccessor";
import { transportationLoadAction } from "../../redux/transportation/transportationActions";
import { getTransportations } from "../../redux/transportation/transportationAccessor";
import { ITransportationResponse } from "../../redux/transportation/transportationConstants";
import LAAutoComplete from "../shared/autoCompleteDropDown";
import LADateTimePicker from "../shared/dateTimePicker";
import { getAirports } from "../../redux/airport/airportAccessor";
import { IAirportResponse, IGetAirportRequest } from "../../redux/airport/airportConstants";
import { airportLoadAction } from "../../redux/airport/airportActions";
import { LASaveAndCancelButton } from "../shared/buttons";
import { ROUTE } from "../routes";
import { getAddCustomer } from "../../redux/customer/addCustomer/addCustomerAccessor";
import { addCustomerLoadAction } from "../../redux/customer/addCustomer/addCustomerActions";
import { IAddEditCustomerRequest } from "../../redux/customer/addCustomer/addCustomerConstants";
import { editCustomerLoadAction } from "../../redux/customer/editCustomer/editCustomerActions";
import { getEditCustomer } from "../../redux/customer/editCustomer/editCustomerAccessor";
import { FieldValidator, IFieldErrorKeyValue } from "../shared/fieldValidator";

interface ICustomerDetailsComponentStoreProps {
    customerList: Server<LaunchCodeApiResponse<ById<IPatient>>>;
    transPortationList: Server<ById<ITransportationResponse>>;
    airportList: Server<ById<IAirportResponse>>;
    addCustomer: Server<string>;
    editCustomer: Server<string>;
};

interface ICustomerDetailsComponentDispatchProps {
    customerRequest: (data: IGetCustomerRequest) => unknown;
    transportationRequest: () => unknown;
    airportRequest: (data: IGetAirportRequest) => unknown;
    addCustomerRequest: (data: IAddEditCustomerRequest) => unknown;
    editCustomerRequest: (data: IAddEditCustomerRequest) => unknown;
};

interface ICustomerDetailsOwnProps {
    id: number;
};

interface ICustomerDetailsComponentState {
    details: IPatient;
    airport: {
        loadingAirports: boolean;
        airportSearch: string;
        airportList: ById<IAirportResponse>;
    };
    errors: ById<IFieldErrorKeyValue>;
};

const CustomerDetailsStyles = styled.div`
    margin: 40px 20px;
    
    @media only screen and (max-width: ${MEDIA_QUERY_PHONE}) {
        margin: 15px 10px;
     }
`;

type ICustomerDetailsComponentProps =
    RouteComponentProps
    & ICustomerDetailsOwnProps
    & ICustomerDetailsComponentStoreProps
    & ICustomerDetailsComponentDispatchProps;

class CustomerDetails extends PureComponent<ICustomerDetailsComponentProps, ICustomerDetailsComponentState> {

    public constructor(props: ICustomerDetailsComponentProps) {
        super(props);
        this.state = {
            details: {
                id: "",
                firstName: "",
                lastName: "",
                gender: "",
                dateOfBirth: "",
                occupations: [],
                phones: [],
                emails: [],
                addresses: [],
                websites: [],
                type: DOCTOR_TYPE.FAMILY
            },
            airport: {
                loadingAirports: false,
                airportSearch: "",
                airportList: {}
            },
            errors: {}
        };
        this.handleAirportSearch = this.debounce(this.handleAirportSearch, 100);
    }

    public componentDidMount(): void {
        this.checkReduxState();
        this.setAirportsToState();
        this.errorsToState();
    };

    public componentDidUpdate(prevProps: ICustomerDetailsComponentProps): void {
        if (this.props.customerList !== prevProps.customerList) {
            this.checkReduxState();
        }

        if ((this.props.airportList !== prevProps.airportList)) {
            this.setAirportsToState();
        }
    };

    public render(): ReactNode {

        const { details, airport, errors } = this.state;

        return (
            <CustomerDetailsStyles>
                <LAPaperWithPadding>

                    <LAGrid justify="space-evenly" alignItems="center" spacing={3}>

                        <LAGridItem className="text-center mt-3" xs={12} sm={12}>
                            <strong>Travel Information</strong>
                            <hr />
                        </LAGridItem>

                        {/* <LAGridItem xs={12} sm={6}>
                            <LAAutoComplete
                                dropDownPlaceHolder="Depature Airport"
                                multiple={false}
                                getOptionLabel="name"
                                value={details.}
                                defaultValue={details.depature}
                                filterSelectedOptions={false}
                                autoHighlight={true}
                                onChange={this.handleDepatureChange}
                                selectionRemove={() => undefined}
                                onInputChange={this.onDepatureInputChange}
                                option={Object.values(airport.airportList)}
                                errorText={errors["depature"] ? errors["depature"].message : undefined}
                            />
                        </LAGridItem>

                        <LAGridItem xs={12} sm={6}>
                            <LAAutoComplete
                                dropDownPlaceHolder="Destination Airport"
                                multiple={false}
                                getOptionLabel="name"
                                value={details.destination}
                                defaultValue={details.destination}
                                filterSelectedOptions={true}
                                autoHighlight={true}
                                loading={airport.loadingAirports}
                                onChange={this.handleDestinationChange}
                                selectionRemove={() => undefined}
                                onInputChange={this.onDepatureInputChange}
                                option={Object.values(airport.airportList)}
                                errorText={errors["destination"] ? errors["destination"].message : undefined}
                            />
                        </LAGridItem> */}

                        <LAGridItem xs={12} sm={6}>
                            <div className="text-center">Depature Date</div><br />
                            <LADateTimePicker showTime={false} value={details.dateOfBirth} onChange={(value: string) => this.handleDateChange("depatureDate", value)} />
                        </LAGridItem>

                        {/* <LAGridItem xs={12} sm={6}>
                            <LAAutoComplete
                                dropDownPlaceHolder="Transportation"
                                multiple={false}
                                getOptionLabel="name"
                                filterSelectedOptions={true}
                                autoHighlight={true}
                                onChange={this.handleTransChange}
                                selectionRemove={() => undefined}
                                option={hasPayload(this.props.transPortationList) ? Object.values(this.props.transPortationList.payload) : []}
                                value={hasPayload(this.props.transPortationList) ? this.props.transPortationList.payload[details.transportationId] : []}
                                defaultValue={hasPayload(this.props.transPortationList) ? this.props.transPortationList.payload[details.transportationId] : []}
                            />
                        </LAGridItem> */}

                        <LAGridItem className="text-center mt-5" xs={12} sm={12}>
                            <strong>Client Information</strong>
                            <hr />
                        </LAGridItem>

                        <LAGridItem xs={12} sm={6}>
                            <LATextField fullWidth={true}
                                value={details.firstName}
                                name="firstName"
                                label="First Name"
                                onChange={this.handleCustomerInfoChange}
                                errorText={errors["firstName"] ? errors["firstName"].message : undefined}
                            />
                        </LAGridItem>

                        <LAGridItem xs={12} sm={6}>
                            <LATextField
                                fullWidth={true}
                                value={details.lastName}
                                name="lastName"
                                label="Last Name"
                                onChange={this.handleCustomerInfoChange}
                                errorText={errors["lastName"] ? errors["lastName"].message : undefined}
                            />
                        </LAGridItem>

                        <LAGridItem xs={12} sm={6}>
                            {details.phones.map((q, index) => {
                                return(
                                    <LATextField
                                    fullWidth={true}
                                    value={q.number}
                                    name="phoneNumber"
                                    label="Phone Number"
                                    onChange={this.handleCustomerInfoChange}
                                    errorText={errors["phoneNumber"] ? errors["phoneNumber"].message : undefined}
                                />
                                )
                            })}
                        </LAGridItem>

                        <LAGridItem xs={12} sm={6}>
                            {details.emails.map((q, index) => {
                                return(
                                    <LATextField
                                    fullWidth={true}
                                    value={q.address}
                                    name="email"
                                    label="Email"
                                    type="email"
                                    onChange={this.handleCustomerInfoChange}
                                    errorText={errors["email"] ? errors["email"].message : undefined}
                                />
                                )
                            })}
                        </LAGridItem>

                        <LAGridItem xs={12} sm={6}>
                            {details.addresses.map((q, index) => {
                                return(
                                    <LATextField
                                    fullWidth={true}
                                    value={q.addressLine1}
                                    name="address"
                                    label="Address"
                                    onChange={this.handleCustomerInfoChange}
                                    errorText={errors["address"] ? errors["address"].message : undefined}
                                />
                                )
                            })}
                        </LAGridItem>

                        <LAGridItem xs={12} sm={12}>
                            <LASaveAndCancelButton
                                disableSave={Object.values(errors).length > 0 ? true : undefined}
                                onCancel={this.handleBack}
                                onSave={this.handleSave}
                            />
                        </LAGridItem>

                    </LAGrid>

                </LAPaperWithPadding>
            </CustomerDetailsStyles>
        );
    }

    private debounce = (fn: any, delay: any): any => {
        let timer: any = null;
        return (...args: any): any => {
            const context = this;
            timer && clearTimeout(timer);
            timer = setTimeout(() => {
                fn.apply(context, args);
            }, delay);
        };
    };

    private onDepatureInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ airport: { ...this.state.airport, airportSearch: e.currentTarget.value } });
        this.handleAirportSearch();
    };

    private handleAirportSearch = (): void => {
        this.props.airportRequest({ Keywords: this.state.airport.airportSearch, PageNumber: 1, PageSize: 20 });
    };

    private handleCustomerInfoChange = (name: string, value: string) => {
        let initialErrors = this.state.errors;
        initialErrors = this.errorChecker(name, value, initialErrors, true, ((name === "email") ? true : undefined));

        this.setState({
            details: {
                ...this.state.details,
                [name]: value
            },
            errors: initialErrors
        });
    };

    private handleDateChange = (name: string, value: string): void => {
        this.setState({
            details: {
                ...this.state.details,
                [name]: value
            }
        });
    };

    private checkReduxState = (): void => {
        if (hasPayload(this.props.customerList) && this.props.id > 0) {
            const data = this.props.customerList.payload.objectsArray[this.props.id];
            if (data === undefined) {
                this.props.customerRequest({ Keywords: "", PageNumber: 1, PageSize: 1, deleted: false, id: this.props.id });
            } else {
                this.setState({ details: data });
            }
        };

        if (isNotLoaded(this.props.customerList) && this.props.id > 0) {
            this.props.customerRequest({ Keywords: "", PageNumber: 1, PageSize: 1, deleted: false, id: this.props.id });
        };

        if (isNotLoaded(this.props.transPortationList)) {
            this.props.transportationRequest();
        };

        if (isNotLoaded(this.props.airportList)) {
            this.props.airportRequest({ Keywords: "", PageNumber: 1, PageSize: 20 });
            this.setState({ airport: { ...this.state.airport, loadingAirports: true } });
        };
    };

    private setAirportsToState = (): void => {
        if (hasPayload(this.props.airportList)) {
            const currentList = this.state.airport.airportList;
            const combineList = Object.assign(this.props.airportList.payload, currentList);
            this.setState({
                airport: {
                    loadingAirports: false,
                    airportSearch: "",
                    airportList: combineList
                }
            });
        }
    };

    private errorChecker = (name: string, value: string, errors: ById<IFieldErrorKeyValue>, isRequired: boolean, email?: true): ById<IFieldErrorKeyValue> => {
        const result = FieldValidator(value, { required: isRequired ? true : undefined, minLength: 2, decimal: undefined, email });
        const err: ById<IFieldErrorKeyValue> = errors;

        if (result.length > 0) {
            err[name] = { key: name, message: result };
        } else {
            delete err[name];
        }
        return err;
    };

    private handleSave = (): void => {
        const data = this.state.details;
        const errors = this.state.errors;
        if (Object.values(errors).length === 0) {
            if (data) {
                // const requestBody: IAddEditCustomerRequest = {
                    // id: data.id,
                    // transportationId: data.transportationId,
                    // depatureDate: data.depatureDate,
                    // returnDate: data.returnDate,
                    // numberOfTravellers: data.numberOfTravellers,
                    // depatureId: data.depature.id,
                    // destinationId: data.destination.id,
                    // customer: data.customer
                // };

                // if (data.id !== 0) {
                //     this.props.editCustomerRequest(requestBody);
                // } else {
                //     this.props.addCustomerRequest(requestBody);
                // }
                this.handleBack();
            }
        }
    };

    private handleBack = (): void => {
        this.props.history.push(ROUTE.CUSTOMER.INDEX);
    };

    private errorsToState = (): void => {
        if (isNaN(this.props.id)) {
            const data = this.state.details;
            let initialErrors = this.state.errors;
            // initialErrors = this.errorChecker("address", data.addresses, initialErrors, true);
            initialErrors = this.errorChecker("firstName", data.firstName, initialErrors, true);
            initialErrors = this.errorChecker("lastName", data.lastName, initialErrors, true);
            // initialErrors = this.errorChecker("phoneNumber", data.customer.phoneNumber, initialErrors, true);
            // initialErrors = this.errorChecker("email", data.customer.email, initialErrors, true);

            this.setState({ errors: initialErrors });
        }
    };

}

const mapStateToProps = (state: IStore): ICustomerDetailsComponentStoreProps => ({
    customerList: getCustomers(state),
    transPortationList: getTransportations(state),
    airportList: getAirports(state),
    addCustomer: getAddCustomer(state),
    editCustomer: getEditCustomer(state)
});

const mapDispatchToProps = (dispatch: IDispatch): ICustomerDetailsComponentDispatchProps => ({
    customerRequest: (data: IGetCustomerRequest): unknown => dispatch(customerLoadAction(data)),
    transportationRequest: (): unknown => dispatch(transportationLoadAction()),
    airportRequest: (data: IGetAirportRequest): unknown => dispatch(airportLoadAction(data)),
    addCustomerRequest: (data: IAddEditCustomerRequest): unknown => dispatch(addCustomerLoadAction(data)),
    editCustomerRequest: (data: IAddEditCustomerRequest): unknown => dispatch(editCustomerLoadAction(data))
});


export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetails);