import React, { ReactNode, PureComponent } from "react";
import Popper, { PopperPlacementType } from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import { HasChildren } from "./publicInterfaces";

export type LAPopperPlacementType = PopperPlacementType;

interface ILAPopperProps extends HasChildren {
    open: boolean;
    placement?: LAPopperPlacementType;
    // intentionally `any`thing.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    anchorRef: React.RefObject<any>;
    overTop?: false;
    handleOpen: (open: boolean) => void;
}

const transition: React.CSSProperties = {transformOrigin: "center top"};

class LAPopper extends PureComponent<ILAPopperProps> {
    public render(): ReactNode {
        return (
            <Popper
                open={this.props.open}
                anchorEl={this.props.anchorRef.current}
                transition={true}
                placement={this.props.placement}
                className={this.props.overTop ? "" : "go-on-top-of-everything"}
            >
                {({ TransitionProps }): ReactNode =>
                    <Grow
                        {...TransitionProps}
                        style={transition}
                    >
                        {/* without the fragment it gives console error
                            `Failed prop type: The following props are not supported: `style`. Please remove them` */}
                        <>
                            <ClickAwayListener onClickAway={this.handleClose}>
                                {/* Do NOT remove this `div` otherwise functional components
                                    does not work with click-away listener properly */}
                                <div>
                                    {this.props.children}
                                </div>
                            </ClickAwayListener>
                        </>
                    </Grow>
                }
            </Popper>
        );
    }

    private handleClose = (event: React.MouseEvent<EventTarget>): void => {
        if (this.props.anchorRef.current?.contains(event.target)) return;
        this.props.handleOpen(false);
    };
}

export default LAPopper;
