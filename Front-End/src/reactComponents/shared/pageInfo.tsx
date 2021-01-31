import React from "react";
import Helmet from "react-helmet";
import { APP_NAME } from "./theme";

interface IPageInfoProps {
    title: string;
    description: string;
}

const PageInfo = (props: IPageInfoProps): JSX.Element => {
    const title = `${props.title} - ${APP_NAME}`;
    return <Helmet>
        <title>{title}</title>
        <meta name="twitter:title" content={title} />
        <meta name="og:title" content={title} />
        <meta name="description" content={props.description} />
    </Helmet>;
};

export default PageInfo;
