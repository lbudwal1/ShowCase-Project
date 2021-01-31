import React, {PureComponent, ReactNode} from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import { HasClassAndChildren, HasChildren } from "./publicInterfaces";
import LAPopper, { LAPopperPlacementType } from "./popper";

interface ILADropdownMenuProps extends HasClassAndChildren {
    title?: string;
    iconBefore?: ReactNode;
    iconAfter?: ReactNode;
    placement?: LAPopperPlacementType;
    overTop?: false;
}

interface ILADropdownMenuState {
    open: boolean;
}

const style: React.CSSProperties = {height: "100%"};

class LADropdownMenu extends PureComponent<ILADropdownMenuProps, ILADropdownMenuState> {
    private anchorRef: React.RefObject<HTMLButtonElement>;

    public constructor(props: ILADropdownMenuProps) {
        super(props);
        this.state = {
            open: false
        };
        this.anchorRef = React.createRef();
    }

    public render(): ReactNode {
        return (
            <>
                <Button
                    ref={this.anchorRef}
                    style={style}
                    aria-controls="menu-list"
                    aria-haspopup="menu"
                    onClick={this.handleToggle}
                    className={this.props.className}
                >
                    {this.props.iconBefore}{this.props.title && <span className="px-2">{this.props.title}</span>}{this.props.iconAfter}
                </Button>
                <LAPopper
                    open={this.state.open}
                    overTop={this.props.overTop}
                    anchorRef={this.anchorRef}
                    placement={this.props.placement}
                    handleOpen={this.setOpen}
                >
                    <Paper>
                        <MenuList autoFocusItem={this.state.open} onKeyDown={this.handleListKeyDown} onClick={this.handleToggle}>
                            {this.props.children}
                        </MenuList>
                    </Paper>
                </LAPopper>
            </>
        );
    }

    private handleListKeyDown = (event: React.KeyboardEvent): void => {
        if (event.key === "Tab" || event.key === "Escape") {
            event.preventDefault();
            this.setOpen(false);
        }
    };

    private handleToggle = (): void => {
        this.setOpen(!this.state.open);
    };

    private setOpen = (open: boolean): void => {
        this.setState({open});
    };
}

interface ILAMenuItemProps extends HasChildren {
    onClick?: () => void;
}

export const LAMenuItem: React.FC<ILAMenuItemProps> = (props: ILAMenuItemProps) => <MenuItem onClick={props.onClick}>{props.children}</MenuItem>;

export default LADropdownMenu;
