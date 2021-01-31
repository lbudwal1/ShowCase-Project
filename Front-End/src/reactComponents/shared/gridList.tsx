import React from "react";
import Grid, { GridSize } from "@material-ui/core/Grid";
import { HasChildren } from "./publicInterfaces";


interface ILAGridItemProps extends HasChildren {
    xl?: GridSize;
    lg?: GridSize;
    md?: GridSize;
    sm?: GridSize;
    xs?: GridSize;
    isContainer?: boolean;
    className?: string;
}


const LAGridItem: React.FC<ILAGridItemProps> = (props: ILAGridItemProps) => 
    <Grid className={props.className} container={props.isContainer ?? false} item={true} xl={props.xl} lg={props.lg} md={props.md} sm={props.sm} xs={props.xs}>
        {props.children}
    </Grid>
;

export default LAGridItem;
