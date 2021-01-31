import React, { ReactNode, PureComponent } from "react";
import { RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import PageSpacing from "./shared/pageSpacing";
import { IDispatch, IStore } from "../redux/reducers";
import { APP_NAME } from "./shared/theme";


interface ITestComponentStoreProps {
 
};

interface ITestComponentDispatchProps {
  
}

type ITestComponentProps = RouteComponentProps & ITestComponentStoreProps & ITestComponentDispatchProps;

class TestComponent extends PureComponent<ITestComponentProps> {

    public componentDidMount(): void {

    }

    public render(): ReactNode {

        return (
            <PageSpacing title="Home" description={`${APP_NAME} Home Page`} fixedSpaceOnSmallerScreens={true}>
              
              

            </PageSpacing>
        );
    }






}

const mapDispatchToProps = (dispatch: IDispatch): ITestComponentDispatchProps => ({
 
});

const mapStateToProps = (state: IStore): ITestComponentStoreProps => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(TestComponent);




