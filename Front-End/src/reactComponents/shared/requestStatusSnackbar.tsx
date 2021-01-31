import React, { PureComponent, ReactNode } from "react";
import LASnackBar from "./snackBar";
import { STATUS_ENUM } from "../../redux/server";

interface IRequestStatusOwnProps {
    requestStatus: STATUS_ENUM;
    loadingMessage?: string;
    successMessage?: string;
    failedMessage?: string;
}

interface IRequestStatusState {
    loadingSnackBar: boolean;
    successSnackBar: boolean;
    failedSnackBar: boolean;
}

class RequestStatus extends PureComponent<IRequestStatusOwnProps, IRequestStatusState> {

    public constructor(props: IRequestStatusOwnProps) {
        super(props);
        this.state = {
            loadingSnackBar: false,
            successSnackBar: false,
            failedSnackBar: false
        };
    };

    public componentDidMount(): void {

    };

    public componentDidUpdate(prevProps: IRequestStatusOwnProps, prevState: IRequestStatusState): void {
        if (prevProps !== this.props) {
            if (this.props.requestStatus === STATUS_ENUM.LOADING && this.state.loadingSnackBar === false) {
                this.setState({ loadingSnackBar: true, successSnackBar: false, failedSnackBar: false });
            }
            else if (this.props.requestStatus === STATUS_ENUM.SUCCEEDED && this.state.successSnackBar === false) {
                this.setState({ loadingSnackBar: false, successSnackBar: true, failedSnackBar: false });
            }
            else if (this.props.requestStatus === STATUS_ENUM.FAILED && this.state.failedSnackBar === false) {
                this.setState({ loadingSnackBar: false, successSnackBar: false, failedSnackBar: true });
            }
        }
    };

    public render(): ReactNode {
        const { loadingMessage, successMessage, failedMessage } = this.props;
        const { loadingSnackBar, successSnackBar, failedSnackBar } = this.state;

        return (
            <>
                <LASnackBar
                    message={loadingMessage ?? "Processing your request"}
                    loadingBar={true}
                    handleClose={this.handleLoadingClose}
                    open={loadingSnackBar}
                />
                <LASnackBar
                    message={successMessage ?? "Your Request is Succeeded"}
                    loadingBar={false}
                    handleClose={this.handleSuccessClose}
                    open={successSnackBar}
                />
                <LASnackBar
                    message={failedMessage ?? "Your Request is Failed"}
                    loadingBar={false}
                    handleClose={this.handleFailedClose}
                    open={failedSnackBar}
                />
            </>
        );
    }

    private handleLoadingClose = (): void => {
        this.setState({ loadingSnackBar: false });
    };

    private handleSuccessClose = (): void => {
        this.setState({ successSnackBar: false });
    };

    private handleFailedClose = (): void => {
        this.setState({ failedSnackBar: false });
    };

}


export default RequestStatus;