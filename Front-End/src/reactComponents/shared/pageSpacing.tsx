import React from "react";
import styled from "styled-components";
import PageInfo from "./pageInfo";
import { HasChildren } from "./publicInterfaces";
import { MEDIA_QUERY_PHONE } from "./theme";

interface IPageSpacingProps extends HasChildren {
    title: string;
    description: string;
    fixedSpaceOnSmallerScreens?: true;
}

const PageSpacingStyles = styled.div`
    margin: 1.5rem;

    ${(props: {fixedSpaceOnSmallerScreens?: true}): string =>
        props.fixedSpaceOnSmallerScreens
            ? ""
            :`@media (max-width: ${MEDIA_QUERY_PHONE}) {
                margin: 1.5rem 0;
            }`}
`;

const PageSpacing: React.FC<IPageSpacingProps> = (props: IPageSpacingProps) => 
    <PageSpacingStyles fixedSpaceOnSmallerScreens={props.fixedSpaceOnSmallerScreens}>
        <PageInfo title={props.title} description={props.description} />
        {props.children}
    </PageSpacingStyles>
;

export default PageSpacing;
