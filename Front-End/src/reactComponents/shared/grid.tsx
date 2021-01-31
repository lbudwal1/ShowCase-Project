import React from "react";
import Grid, { GridDirection, GridItemsAlignment } from "@material-ui/core/Grid";
import { HasClassAndChildren } from "./publicInterfaces";

interface ILCGridProps extends HasClassAndChildren {
    spacing?: Spacing;
    justify?: GridJustification;
    direction?: GridDirection;
    alignItems?: GridItemsAlignment;
}

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
type Spacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
const DEFAULT_SPACING = 1;

type GridJustification = "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly";
const DEFAULT_JUSTIFY = "flex-start";

const LCGrid: React.FC<ILCGridProps> = (props: ILCGridProps) => {
    return (
        <Grid direction={props.direction} alignItems={props.alignItems} container={true} justify={props.justify || DEFAULT_JUSTIFY} spacing={props.spacing || DEFAULT_SPACING} className={props.className}>
            {props.children}
        </Grid>
    );
};

export default LCGrid;
