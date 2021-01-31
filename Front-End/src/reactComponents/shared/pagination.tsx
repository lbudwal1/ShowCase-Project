import React, { ReactNode, PureComponent } from "react";
import styled from "styled-components";
import { HasClass } from "./publicInterfaces";
import { DARK_GREY_COLOR, MAIN_COLOR, MEDIA_QUERY_MATERILUI_SM, MEDIA_QUERY_PHONE } from "./theme";
import LAGrid from "./grid";
import LAGridItem from "./gridList";
import { LAIconButton } from "./buttons";
import { ArrowFastForwardIcon, ArrowFastRewindIcon, ArrowLeftIcon, ArrowRightIcon } from "./icons";

interface ILAPagination extends HasClass {
    numberOfItems: number;
    rowsPerPage: number;
    currentPage: number;
    onPageChange: (currentPage?: number, rowsPerPage?: number) => void;
}

interface ILAPaginationState {
    nextButtonDisable: true | undefined;
    backButtonDisable: true | undefined;
    dropDownNumberOptions: number[];
    currentPage: number;
    rowsPerPage: number;
    width: number;
}


const PaginationStyles = styled.div`
    .inline-div {
        display: inline-block;
        width: 100%;
    
    }
    .span-with-space {
        margin-left: 5px;
    };

    @media only screen and (max-width: ${MEDIA_QUERY_PHONE}) {
        .actions {
            padding-top: 30px;
            padding-bottom: 30px;
        };
    };
`;

class LAPagination extends PureComponent<ILAPagination, ILAPaginationState> {

    public constructor(props: ILAPagination) {
        super(props);
        this.state = {
            nextButtonDisable: undefined,
            backButtonDisable: true,
            dropDownNumberOptions: [],
            currentPage: props.currentPage,
            rowsPerPage: props.rowsPerPage,
            width: 0
        };
    }

    public componentDidMount(): void {
        this.checkButtons();
        this.handleResize();
        window.addEventListener("resize", this.handleResize);
    };


    public componentDidUpdate(): void {
        this.checkButtons();
    };

    public componentWillUnmount(): void {
        window.removeEventListener("resize", this.handleResize);
    };



    public render(): ReactNode {

        const { backButtonDisable, width } = this.state;
        const { currentPage } = this.props;

        return (

            <PaginationStyles>
                <div className="inline-div text-center">
                <LAGrid direction={width < MEDIA_QUERY_MATERILUI_SM ? "column" : "column-reverse"} justify="space-between">

                        <LAGridItem xs={12} sm={12} md={12}>

                            <LAIconButton
                                label="Go to first page"
                                disabled={backButtonDisable}
                                onClick={this.handleGoToFirstPageClick}
                                icon={!backButtonDisable ? <ArrowFastRewindIcon color={MAIN_COLOR} /> : <ArrowFastRewindIcon color={DARK_GREY_COLOR} />}
                            />

                            <LAIconButton
                                label="Go to previous page"
                                disabled={backButtonDisable}
                                onClick={this.handleBackwardClick}
                                icon={!backButtonDisable ? <ArrowLeftIcon color={MAIN_COLOR} /> : <ArrowLeftIcon color={DARK_GREY_COLOR} />}
                            />

                            <span>
                                {`${this.getTotalPageCount() > 0 ? currentPage : 0} of ${this.getTotalPageCount()}`}
                            </span>

                            <LAIconButton
                                label="Go to next page"
                                disabled={this.state.nextButtonDisable}
                                onClick={this.handleForwardClick}
                                icon={!this.state.nextButtonDisable ? <ArrowRightIcon color={MAIN_COLOR} /> : <ArrowRightIcon color={DARK_GREY_COLOR} />}
                            />

                            <LAIconButton
                                label="Go to last page"
                                disabled={this.state.nextButtonDisable}
                                onClick={this.handleGoToLastPageClick}
                                icon={!this.state.nextButtonDisable ? <ArrowFastForwardIcon color={MAIN_COLOR} /> : <ArrowFastForwardIcon color={DARK_GREY_COLOR} />}
                            />

                        </LAGridItem>

                    </LAGrid>
                </div>
            </PaginationStyles>
        );
    }

    private handleResize = (): void => {
        this.setState({width: window.innerWidth}); 
    };

    private checkButtons = (): void => {
        const total = this.getTotalPageCount();
        // If user is on last page disable next button ELSE make it active
        if (this.props.currentPage >= total && this.state.nextButtonDisable === undefined) {
            this.setState({ nextButtonDisable: true });
        } else if (this.props.currentPage < total && this.state.nextButtonDisable === true) {
            this.setState({ nextButtonDisable: undefined });
        };

        // If user is on very first page disable back button ELSE make it active
        if (this.props.currentPage <= 1 && this.state.backButtonDisable === undefined) {
            this.setState({ backButtonDisable: true });
        } else if (this.props.currentPage !== 1 && this.state.backButtonDisable === true) {
            this.setState({ backButtonDisable: undefined });
        };
    };


    private getTotalPageCount(): number {
        return Math.ceil(this.props.numberOfItems / this.state.rowsPerPage);
    };

    private handleForwardClick = (): void => {
        const newPageNumber: number = this.props.currentPage + 1;
        this.setState({ currentPage: newPageNumber });
        this.props.onPageChange(newPageNumber, undefined);
    };

    private handleGoToFirstPageClick = (): void => {
        this.setState({ currentPage: 1 });
        this.props.onPageChange(1, undefined);
    };

    private handleBackwardClick = (): void => {
        const newPageNumber: number = this.props.currentPage - 1;
        this.setState({ currentPage: newPageNumber });
        this.props.onPageChange(newPageNumber, undefined);
    };

    private handleGoToLastPageClick = (): void => {
        this.setState({ currentPage: this.getTotalPageCount() });
        this.props.onPageChange(this.getTotalPageCount(), undefined);
    };

    private handleRowsPerPage = (value: number): void => {
        this.setState({ currentPage: 1, rowsPerPage: value });
        this.props.onPageChange(1, value);
    };
}

export default LAPagination;
