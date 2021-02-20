import React from "react";
import Card from "@material-ui/core/Card";
import { HasClassAndChildren } from "./publicInterfaces";

const LAFlushCard: React.FC<HasClassAndChildren> = (props: HasClassAndChildren) => <Card className={props.className} elevation={3}>{props.children}</Card>;

export default LAFlushCard;
