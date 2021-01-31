import React, {PureComponent, ReactNode} from "react";
import TextField from "@material-ui/core/TextField";
import { FilledInputProps } from "@material-ui/core/FilledInput";
import { HasClass } from "./publicInterfaces";

export const ENTER_KEY_CODE = 13;
export const ESCAPE_KEY_CODE = 27;
export const REQUIRED = "Required";

export interface ITextFieldProps extends HasClass {
    id?: string;
    name: string;
    label: string | undefined; // set `hiddenLabel` to `true` if `undefined` to hide the label 
    value: string | number;
    required?: true;
    fullWidth?: boolean;
    placeholder?: string;
    hiddenLabel?: true;
    margin?: "dense";
    errorText?: string;
    disabled?: boolean;
    type?: string;
    autoFocus?: true;
    InputProps?: Partial<FilledInputProps>;
    onPressEnter?: () => unknown;
    onChange: (name: string, value: string, indexPosition?: number) => void;
    onBlur?: () => unknown;
}

export const TEXT_FIELD_VARIANT = "standard";

class LATextField extends PureComponent<ITextFieldProps> {
    public render(): ReactNode {
        const helperText: string | undefined = this.props.errorText;
        const error: true | undefined = helperText ? true : undefined;

        return (
            <div className={this.props.className}>
                <TextField
                    variant={TEXT_FIELD_VARIANT}
                    id={this.props.id}
                    name={this.props.name}
                    label={this.props.label}
                    value={this.props.value}
                    required={this.props.required}
                    fullWidth={this.props.fullWidth}
                    placeholder={this.props.placeholder}
                    hiddenLabel={this.props.hiddenLabel}
                    autoFocus={this.props.autoFocus}
                    margin={this.props.margin}
                    helperText={helperText}
                    error={error}
                    disabled={this.props.disabled}
                    type={this.props.type}
                    InputProps={this.props.InputProps}
                    onChange={this.handleOnChange}
                    onKeyPress={this.onKeyPress}
                    onBlur={this.props.onBlur}
                />
            </div>
        );
    }

    private onKeyPress = (e: React.KeyboardEvent<HTMLDivElement>): void => {
        if (this.props.onPressEnter && e.which === ENTER_KEY_CODE) {
            this.props.onPressEnter();
            e.preventDefault();
        }
    };

    private handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = event.target;
        this.props.onChange(name, value);
    };
}

export interface ITextWrapperProps {
    value: string | number;
    fieldName?: string;
}

export const TextWrapper: React.FC<ITextWrapperProps> = (props: ITextWrapperProps) =>
    <div>{props.value}</div>
;

export const TextWrapperWithMargins: React.FC<ITextWrapperProps> = (props: ITextWrapperProps) =>
    <div className="m-3">{props.value}</div>
;

interface IEditableTextFieldProps extends ITextFieldProps {
    isEditMode: boolean;
    fieldName?: string;
    Wrapper: React.FunctionComponent<ITextWrapperProps>;
}

export const EditableTextField: React.FC<IEditableTextFieldProps> = (props: IEditableTextFieldProps) => {
    const {Wrapper, ...rest} = props;
    
    return props.isEditMode
        ? <LATextField {...rest} />
        : <Wrapper fieldName={props.fieldName} value={props.value} />;
};

export default LATextField;
