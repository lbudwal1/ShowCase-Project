import React from "react";
import DatePicker from "react-datepicker";
import { HasClass } from "./publicInterfaces";
import "react-datepicker/dist/react-datepicker.css";
import { DateIcon } from "./icons";
import { LAButton } from "./buttons";

export const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
];

const getDate = (showTime: boolean, value?: string): string => {
   if(value !== ""){
    const coeff = 1000 * 60 * 5;

    const date = value ? new Date(value) : new Date();
    const rounded = new Date(Math.round(date.getTime() / coeff) * coeff);
    const format = `${monthNames[date.getMonth()]}-${date.getDate()}-${date.getFullYear()}`;
    const time = showTime ? `• ${date.getHours()}:${rounded.getMinutes()} ${date.getHours() < 12 ? "AM" : "PM"}` : "";

    return format + time;
   }
   return "";
};


interface ILADateTimePickerProps extends HasClass {
    value: string;
    onChange: (value: string) => void;
    opened?: boolean;
    showTime: boolean;
}

const LADateTimePicker: React.FC<ILADateTimePickerProps> = (props: ILADateTimePickerProps) =>
    <DatePicker
        selected={props.value.length > 0 ? new Date(props.value) : new Date()}
        onChange={(e): void => props.onChange(e?.toLocaleString() ?? "")}
        showTimeSelect={props.showTime}
        timeIntervals={5}
        timeCaption="time"
        timeFormat="h:mm aa"
        dateFormat="MMMM d, yyyy h:mm aa"
        withPortal={true}
        customInput={
            <LAButton
                fullWidth={true}
                startIcon={<DateIcon />}
                label={getDate(props.showTime, props.value)}
                onClick={(): void => undefined} />
        }
        inline={props.opened ?? false}
    />
    ;

export default LADateTimePicker;
