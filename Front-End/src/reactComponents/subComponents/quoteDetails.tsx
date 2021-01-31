import React, { ReactNode, PureComponent } from "react";
import { RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { IDispatch, IStore } from "../../redux/reducers";
import { IGetQuoteRequest, IQuoteResponse } from "../../redux/quote/quoteConstants";
import { LAPaperWithPadding } from "../shared/paper";
import styled from "styled-components";
import { MEDIA_QUERY_PHONE } from "../shared/theme";
import { ById, LaunchCodeApiResponse } from "../shared/publicInterfaces";
import LAGrid from "../shared/grid";
import LAGridItem from "../shared/gridList";
import LATextField from "../shared/textField";
import { hasPayload, isNotLoaded, Server } from "../../redux/server";
import { quoteLoadAction } from "../../redux/quote/quoteActions";
import { getQuotes } from "../../redux/quote/quoteAccessor";
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
import { getAddQuote } from "../../redux/quote/addQuote/addQuoteAccessor";
import { addQuoteLoadAction } from "../../redux/quote/addQuote/addQuoteActions";
import { IAddEditQuoteRequest } from "../../redux/quote/addQuote/addQuoteConstants";
import { editQuoteLoadAction } from "../../redux/quote/editQuote/editQuoteActions";
import { getEditQuote } from "../../redux/quote/editQuote/editQuoteAccessor";
import { FieldValidator, IFieldErrorKeyValue } from "../shared/fieldValidator";

interface IQuoteDetailsComponentStoreProps {
    quoteList: Server<LaunchCodeApiResponse<ById<IQuoteResponse>>>;
    transPortationList: Server<ById<ITransportationResponse>>;
    airportList: Server<ById<IAirportResponse>>;
    addQuote: Server<string>;
    editQuote: Server<string>;
};

interface IQuoteDetailsComponentDispatchProps {
    quoteRequest: (data: IGetQuoteRequest) => unknown;
    transportationRequest: () => unknown;
    airportRequest: (data: IGetAirportRequest) => unknown;
    addQuoteRequest: (data: IAddEditQuoteRequest) => unknown;
    editQuoteRequest: (data: IAddEditQuoteRequest) => unknown;
};

interface IQuoteDetailsOwnProps {
    id: number;
};

interface IQuoteDetailsComponentState {
    details: IQuoteResponse;
    airport: {
        loadingAirports: boolean;
        airportSearch: string;
        airportList: ById<IAirportResponse>;
    };
    errors: ById<IFieldErrorKeyValue>;
};

const QuoteDetailsStyles = styled.div`
    margin: 40px 20px;
    
    @media only screen and (max-width: ${MEDIA_QUERY_PHONE}) {
        margin: 15px 10px;
     }
`;

type IQuoteDetailsComponentProps =
    RouteComponentProps
    & IQuoteDetailsOwnProps
    & IQuoteDetailsComponentStoreProps
    & IQuoteDetailsComponentDispatchProps;

class QuoteDetails extends PureComponent<IQuoteDetailsComponentProps, IQuoteDetailsComponentState> {

    public constructor(props: IQuoteDetailsComponentProps) {
        super(props);
        this.state = {
            details: {
                id: 0,
                transportationId: 1,
                quoteStatus: 1,
                depature: {
                    id: 0,
                    name: "",
                    code: "",
                    stateCode: "",
                    countryCode: "",
                    countryName: ""
                },
                destination: {
                    id: 0,
                    name: "",
                    code: "",
                    stateCode: "",
                    countryCode: "",
                    countryName: ""
                },
                depatureDate: new Date().toDateString(),
                returnDate: "",
                numberOfTravellers: 0,
                customer: {
                    id: 0,
                    firstName: "",
                    lastName: "",
                    phoneNumber: "",
                    email: "",
                    address: ""
                }
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

    public componentDidUpdate(prevProps: IQuoteDetailsComponentProps): void {
        if (this.props.quoteList !== prevProps.quoteList) {
            this.checkReduxState();
        }

        if ((this.props.airportList !== prevProps.airportList)) {
            this.setAirportsToState();
        }
    };

    public render(): ReactNode {

        const { details, airport, errors } = this.state;

        return (
            <QuoteDetailsStyles>
                <LAPaperWithPadding>

                    <LAGrid justify="space-evenly" alignItems="center" spacing={3}>

                        <LAGridItem className="text-center mt-3" xs={12} sm={12}>
                            <strong>Travel Information</strong>
                            <hr />
                        </LAGridItem>

                        <LAGridItem xs={12} sm={6}>
                            <LAAutoComplete
                                dropDownPlaceHolder="Depature Airport"
                                multiple={false}
                                getOptionLabel="name"
                                value={details.depature}
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
                        </LAGridItem>

                        <LAGridItem xs={12} sm={6}>
                            <div className="text-center">Depature Date</div><br />
                            <LADateTimePicker showTime={false} value={details.depatureDate} onChange={(value: string) => this.handleDateChange("depatureDate", value)} />
                        </LAGridItem>

                        <LAGridItem xs={12} sm={6}>
                            <div className="text-center">Return Date</div><br />
                            <LADateTimePicker showTime={false} value={details.returnDate ?? ""} onChange={(value: string) => this.handleDateChange("returnDate", value)} />
                        </LAGridItem>

                        <LAGridItem xs={12} sm={6}>
                            <LATextField fullWidth={true} value={details.numberOfTravellers} type="number" name="noOfTravellers"
                                label="Number Of Travellers" onChange={this.handleNumberOfTraveller}
                            />
                        </LAGridItem>

                        <LAGridItem xs={12} sm={6}>
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
                        </LAGridItem>

                        <LAGridItem className="text-center mt-5" xs={12} sm={12}>
                            <strong>Customer Information</strong>
                            <hr />
                        </LAGridItem>

                        <LAGridItem xs={12} sm={6}>
                            <LATextField fullWidth={true}
                                value={details.customer.firstName}
                                name="firstName"
                                label="First Name"
                                onChange={this.handleCustomerInfoChange}
                                errorText={errors["firstName"] ? errors["firstName"].message : undefined}
                            />
                        </LAGridItem>

                        <LAGridItem xs={12} sm={6}>
                            <LATextField
                                fullWidth={true}
                                value={details.customer.lastName}
                                name="lastName"
                                label="Last Name"
                                onChange={this.handleCustomerInfoChange}
                                errorText={errors["lastName"] ? errors["lastName"].message : undefined}
                            />
                        </LAGridItem>

                        <LAGridItem xs={12} sm={6}>
                            <LATextField
                                fullWidth={true}
                                value={details.customer.phoneNumber}
                                name="phoneNumber"
                                label="Phone Number"
                                onChange={this.handleCustomerInfoChange}
                                errorText={errors["phoneNumber"] ? errors["phoneNumber"].message : undefined}
                            />
                        </LAGridItem>

                        <LAGridItem xs={12} sm={6}>
                            <LATextField
                                fullWidth={true}
                                value={details.customer.email}
                                name="email"
                                label="Email"
                                type="email"
                                onChange={this.handleCustomerInfoChange}
                                errorText={errors["email"] ? errors["email"].message : undefined}
                            />
                        </LAGridItem>

                        <LAGridItem xs={12} sm={12}>
                            <LATextField
                                fullWidth={true}
                                value={details.customer.address}
                                name="address"
                                label="Address"
                                onChange={this.handleCustomerInfoChange}
                                errorText={errors["address"] ? errors["address"].message : undefined}
                            />
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
            </QuoteDetailsStyles>
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
                customer: {
                    ...this.state.details.customer,
                    [name]: value
                }
            },
            errors: initialErrors
        });
    };

    private handleDepatureChange = (event: unknown, value: IAirportResponse): void => {
        const initialErrors = { ...this.state.errors };
        delete initialErrors["depature"];
        this.setState({ details: { ...this.state.details, depature: value }, errors: initialErrors });
    };

    private handleDestinationChange = (event: unknown, value: IAirportResponse): void => {
        const initialErrors = { ...this.state.errors };
        delete initialErrors["destination"];
        this.setState({ details: { ...this.state.details, destination: value }, errors: initialErrors });
    };

    private handleNumberOfTraveller = (name: string, value: string) => {
        this.setState({ details: { ...this.state.details, numberOfTravellers: Number(value) } });
    };

    private handleTransChange = (event: unknown, value: ITransportationResponse): void => {
        this.setState({ details: { ...this.state.details, transportationId: Number(value.id) } });
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
        if (hasPayload(this.props.quoteList) && this.props.id > 0) {
            const data = this.props.quoteList.payload.objectsArray[this.props.id];
            if (data === undefined) {
                this.props.quoteRequest({ Keywords: "", PageNumber: 1, PageSize: 1, deleted: false, id: this.props.id });
            } else {
                this.setState({ details: data });
            }
        };

        if (isNotLoaded(this.props.quoteList) && this.props.id > 0) {
            this.props.quoteRequest({ Keywords: "", PageNumber: 1, PageSize: 1, deleted: false, id: this.props.id });
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
                const requestBody: IAddEditQuoteRequest = {
                    id: data.id,
                    transportationId: data.transportationId,
                    depatureDate: data.depatureDate,
                    returnDate: data.returnDate,
                    numberOfTravellers: data.numberOfTravellers,
                    depatureId: data.depature.id,
                    destinationId: data.destination.id,
                    customer: data.customer
                };

                if (data.id !== 0) {
                    this.props.editQuoteRequest(requestBody);
                } else {
                    this.props.addQuoteRequest(requestBody);
                }
                this.handleBack();
            }
        }
    };

    private handleBack = (): void => {
        this.props.history.push(ROUTE.QUOTE.INDEX);
    };

    private errorsToState = (): void => {
        if (isNaN(this.props.id)) {
            const data = this.state.details;
            let initialErrors = this.state.errors;
            initialErrors = this.errorChecker("address", data.customer.address, initialErrors, true);
            initialErrors = this.errorChecker("firstName", data.customer.firstName, initialErrors, true);
            initialErrors = this.errorChecker("lastName", data.customer.lastName, initialErrors, true);
            initialErrors = this.errorChecker("phoneNumber", data.customer.phoneNumber, initialErrors, true);
            initialErrors = this.errorChecker("email", data.customer.email, initialErrors, true);
            initialErrors = this.errorChecker("destination", data.destination.name, initialErrors, true);
            initialErrors = this.errorChecker("depature", data.depature.name, initialErrors, true);

            this.setState({ errors: initialErrors });
        }
    };

}

const mapStateToProps = (state: IStore): IQuoteDetailsComponentStoreProps => ({
    quoteList: getQuotes(state),
    transPortationList: getTransportations(state),
    airportList: getAirports(state),
    addQuote: getAddQuote(state),
    editQuote: getEditQuote(state)
});

const mapDispatchToProps = (dispatch: IDispatch): IQuoteDetailsComponentDispatchProps => ({
    quoteRequest: (data: IGetQuoteRequest): unknown => dispatch(quoteLoadAction(data)),
    transportationRequest: (): unknown => dispatch(transportationLoadAction()),
    airportRequest: (data: IGetAirportRequest): unknown => dispatch(airportLoadAction(data)),
    addQuoteRequest: (data: IAddEditQuoteRequest): unknown => dispatch(addQuoteLoadAction(data)),
    editQuoteRequest: (data: IAddEditQuoteRequest): unknown => dispatch(editQuoteLoadAction(data))
});


export default connect(mapStateToProps, mapDispatchToProps)(QuoteDetails);