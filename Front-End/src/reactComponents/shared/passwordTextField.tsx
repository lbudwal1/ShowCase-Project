import React, {PureComponent, ReactNode} from "react";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import TPSTextField, { ITextFieldProps } from "./textField";
import { Visibility, VisibilityOff } from "./icons";

type IPasswordTextFieldProps = Omit<ITextFieldProps, "type">;

interface IPasswordTextFieldState {
    showPassword: boolean;
}

class PasswordTextField extends PureComponent<IPasswordTextFieldProps, IPasswordTextFieldState> {
    public constructor(props: IPasswordTextFieldProps) {
        super(props);
        this.state = {
            showPassword: false
        };
    }

    public render(): ReactNode {
        const {showPassword} = this.state;
        return (
            <TPSTextField
                type={showPassword ? "text" : "password"}
                {...this.props}
                InputProps={{
                    endAdornment: 
                        <InputAdornment position="end">
                            <IconButton
                                edge="end"
                                aria-label="toggle password visibility"
                                onClick={this.handleClickShowPassword}
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                }}
            />
        );
    }

    private handleClickShowPassword = (): void => {
        this.setState((state) => ({showPassword: !state.showPassword}));
    };
}

export default PasswordTextField;
