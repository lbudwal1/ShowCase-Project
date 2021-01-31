import React, { ReactNode, PureComponent } from "react";
import { RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { IDispatch, IStore } from "../../redux/reducers";
import LAGrid from ".././shared/grid";
import LAGridItem from ".././shared/gridList";
import { ById } from ".././shared/publicInterfaces";
import { IQuoteResponse } from "../../redux/quote/quoteConstants";
import { LAButton, LAIconButton } from "../shared/buttons";
import { LAPaperWithPadding } from "../shared/paper";
import { DeleteIcon } from "../shared/icons";
import { ROUTE } from "../routes";
import { Server, STATUS_ENUM } from "../../redux/server";
import { IDeleteQuoteRequest } from "../../redux/quote/deleteQuote/deleteQuoteConstants";
import { getDeleteQuote } from "../../redux/quote/deleteQuote/deleteQuoteAccessor";
import { deleteQuoteLoadAction } from "../../redux/quote/deleteQuote/deleteQuoteActions";
import { MAIN_COLOR } from "../shared/theme";
import LAErrorBox from "../shared/errorBox";
import LALoading from "../shared/loading";

interface IQuoteListComponentStoreProps {
    deleteQuote: Server<string>;
};

interface IQuoteListComponentDispatchProps {
    deleteQuoteRequest: (data: IDeleteQuoteRequest) => unknown;
};

interface IQuoteListOwnProps {
    data: ById<IQuoteResponse>;
    deleted: boolean;
    dataStatus: STATUS_ENUM;
}

interface IQuoteListComponentState {

}


type IQuoteListComponentProps =
    RouteComponentProps
    & IQuoteListOwnProps
    & IQuoteListComponentStoreProps
    & IQuoteListComponentDispatchProps;

class QuoteList extends PureComponent<IQuoteListComponentProps, IQuoteListComponentState> {

    public constructor(props: IQuoteListComponentProps) {
        super(props);
        this.state = {

        };
    }

    public componentDidMount(): void {

    };

    public componentDidUpdate(prevProps: IQuoteListComponentProps): void {

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
                return <LAGridItem xs={12}><LALoading className="text-center" message="Loading Quotes. Please Wait..." /></LAGridItem>;

            case STATUS_ENUM.FAILED:
                return <LAGridItem xs={12}><LAErrorBox color={MAIN_COLOR} text="Sorry Failed to Load Data. Try to refresh the window..." /></LAGridItem>;

            case STATUS_ENUM.SUCCEEDED:
                return <>
                    {Object.values(this.props.data).length === 0 && <LAGridItem xs={12}>
                        <LAErrorBox text="Sorry No Record Found" />
                    </LAGridItem>}

                    {Object.values(this.props.data).map((x: IQuoteResponse, index: number) => {
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
        this.props.history.push(ROUTE.QUOTE.DETAILS(id));
    };

    private onDeleteClick = (id: number): void => {
        this.props.deleteQuoteRequest({ id });
    };

}

const mapStateToProps = (state: IStore): IQuoteListComponentStoreProps => ({
    deleteQuote: getDeleteQuote(state)
});

const mapDispatchToProps = (dispatch: IDispatch): IQuoteListComponentDispatchProps => ({
    deleteQuoteRequest: (data: IDeleteQuoteRequest): unknown => dispatch(deleteQuoteLoadAction(data))
});



export default connect(mapStateToProps, mapDispatchToProps)(QuoteList);




