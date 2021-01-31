import React from "react";
import Chip from "@material-ui/core/Chip/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { HasClass } from "./publicInterfaces";

interface ILCAutoCompleteDropDown extends HasClass {
    option: any | undefined;
    getOptionLabel: any;
    id?: id;
    defaultValue: any | [];
    disabled?: boolean;
    multiple: boolean;
    value: any;
    filterSelectedOptions: boolean;
    autoHighlight: boolean;
    onChange: (event: unknown, values: any) => void;
    selectionRemove: (values: any) => void;
    dropDownPlaceHolder?: string;
    onOpen?: () => void;
    onClose?: () => void;
    loading?: boolean;
    errorText?: string;
    name?: string;
    freeText?: true;
    onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

type id = "disableOpenOnFocus" | "autoHighlight" | "autoComplete" | "includeInputInList" | "disableClearable" | "clearOnEscape" | "select-on-focus";
const DEFAULT_ID = "select-on-focus";


const LCAutoComplete: React.FC<ILCAutoCompleteDropDown> = (props: ILCAutoCompleteDropDown) => {
    const helperText: string | undefined = props.errorText;
    const error: true | undefined = helperText ? true : undefined;

    return (
        <Autocomplete
            freeSolo={props.freeText ?? false}
            className={props.className}
            filterSelectedOptions={props.filterSelectedOptions}
            options={props.option ? Object.values(props.option) : []}
            getOptionLabel={(option: any): string => option[props.getOptionLabel]}
            id={props.id || DEFAULT_ID}
            disabled={props.disabled || false}
            onChange={props.onChange}
            defaultValue={props.defaultValue}
            multiple={props.multiple}
            value={props.value}
            autoHighlight={props.autoHighlight}
            loading={props.loading}
            onOpen={props.onOpen}
            onClose={props.onClose}
            renderTags={(value: any): JSX.Element[] =>
                value.map((option: any, index: number): JSX.Element =>
                    <Chip
                        className="mb-2 ml-2 mr-2"
                        variant="outlined"
                        color="primary"
                        key={index}
                        disabled={props.disabled || false}
                        clickable={true}
                        label={option[props.getOptionLabel]}
                        onDelete={(): void => props.selectionRemove(option[props.getOptionLabel])}
                    />
                )
            }
            renderInput={(params): JSX.Element => {
                const inputProps: any = params.inputProps;
                inputProps.autoComplete = "off";
                return <TextField {...params}
                    rowsMax={2}
                    inputProps={inputProps}
                    multiline={true}
                    variant="outlined"
                    label={props.dropDownPlaceHolder ?? "Search"}
                    error={error}
                    helperText={helperText}
                    name={props.name}
                    fullWidth={true}
                    onChange={props.onInputChange}
                    required={true}
                />;
            }}
        />
    );
};

export default LCAutoComplete;
