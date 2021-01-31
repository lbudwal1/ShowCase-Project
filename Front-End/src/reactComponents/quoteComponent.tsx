import React, { ReactNode, PureComponent } from "react";
import { RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { IDispatch, IStore } from "../redux/reducers";
import LAGrid from "./shared/grid";
import LAGridItem from "./shared/gridList";
import { hasPayload, isNotLoaded, Server } from "../redux/server";
import { ById, LaunchCodeApiResponse } from "./shared/publicInterfaces";
import { quoteLoadAction } from "../redux/quote/quoteActions";
import { getQuotes } from "../redux/quote/quoteAccessor";
import { IGetQuoteRequest, IQuoteResponse } from "../redux/quote/quoteConstants";
import { LAPaperWithPadding } from "./shared/paper";
import styled from "styled-components";
import { MEDIA_QUERY_PHONE } from "./shared/theme";
import QuoteList from "./subComponents/quoteList";
import LAPagination from "./shared/pagination";
import { LAIconButton } from "./shared/buttons";
import Switch from "@material-ui/core/Switch";
import { ROUTE } from "./routes";
import { AddIcon } from "./shared/icons";
import RequestStatus from "./shared/requestStatusSnackbar";
import { getAddQuote } from "../redux/quote/addQuote/addQuoteAccessor";
import { getEditQuote } from "../redux/quote/editQuote/editQuoteAccessor";

interface IQuoteComponentStoreProps {
    quoteList: Server<LaunchCodeApiResponse<ById<IQuoteResponse>>>;
    addQuote: Server<string>;
    editQuote: Server<string>;
};

interface IQuoteComponentDispatchProps {
    quoteRequest: (data: IGetQuoteRequest) => unknown;
};

interface IQuoteComponentState {
    data: ById<IQuoteResponse>;
    deleted: boolean;
    totalRecords: number;
    currentPage: number;
}


const QuoteStyles = styled.div`
    margin: 40px 20px;
    
    @media only screen and (max-width: ${MEDIA_QUERY_PHONE}) {
        margin: 15px 10px;
     }
`;

type IQuoteComponentProps =
    RouteComponentProps
    & IQuoteComponentStoreProps
    & IQuoteComponentDispatchProps;

class QuoteComponent extends PureComponent<IQuoteComponentProps, IQuoteComponentState> {

    public constructor(props: IQuoteComponentProps) {
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

    public componentDidUpdate(prevProps: IQuoteComponentProps): void {
        if (this.props.quoteList !== prevProps.quoteList) {
            this.setDataToState();
        }
    }

    public render(): ReactNode {
        const { data, deleted, totalRecords, currentPage } = this.state;

        return (
            <QuoteStyles>
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
                                label={!deleted ? "Show Deleted Quotes" : "Show Succeeded/Pending Quotes"}
                                icon={<Switch checked={deleted} color="primary" onChange={this.onPendingQuotesClick} />}
                            />
                            <LAIconButton
                                label="Add Quote"
                                icon={<AddIcon />}
                                onClick={this.onAddNewClick}
                            />
                        </LAGridItem>

                        <LAGridItem xs={12}>
                            <QuoteList {...this.props} dataStatus={this.props.quoteList.kind} data={data} deleted={deleted} />
                        </LAGridItem>
                    </LAGrid>
                </LAPaperWithPadding>
                <RequestStatus requestStatus={this.props.editQuote.kind} />
                <RequestStatus requestStatus={this.props.addQuote.kind} />
            </QuoteStyles>
        );
    }

    private handlePageChange = (currentPage?: number, rowsPerPage?: number): void => {
        this.setState({ currentPage: currentPage ?? 1 });
        this.props.quoteRequest({ Keywords: "", PageNumber: currentPage, PageSize: 20, deleted: this.state.deleted });
    };

    private onAddNewClick = (): void => {
        this.props.history.push(ROUTE.QUOTE.DETAILS());
    };

    private onPendingQuotesClick = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {
        this.setState({ ...this.state, deleted: checked, currentPage: 1 });
        this.props.quoteRequest({ Keywords: "", PageNumber: 1, PageSize: 20, deleted: checked });
    }

    private setDataToState = (): void => {
        if (hasPayload(this.props.quoteList)) {
            const val = this.props.quoteList.payload;
            this.setState({ data: val.objectsArray, totalRecords: val.totalRecords ?? 0 });
        }

        if (isNotLoaded(this.props.quoteList)) {
            this.props.quoteRequest({ Keywords: "", PageNumber: 1, PageSize: 20, deleted: false });
        }
    };

}

const mapStateToProps = (state: IStore): IQuoteComponentStoreProps => ({
    quoteList: getQuotes(state),
    addQuote: getAddQuote(state),
    editQuote: getEditQuote(state)
});

const mapDispatchToProps = (dispatch: IDispatch): IQuoteComponentDispatchProps => ({
    quoteRequest: (data: IGetQuoteRequest): unknown => dispatch(quoteLoadAction(data))
});



export default connect(mapStateToProps, mapDispatchToProps)(QuoteComponent);




