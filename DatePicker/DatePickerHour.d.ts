import React from "react";
import type { FauxChangeEventHandler } from "../lib/helperTypes";
interface DatePickerHourProps {
    changeHandler?: FauxChangeEventHandler;
    dateStamp: number;
    disablePast: boolean;
    isCompact: boolean;
    isDisabled: boolean;
    pickerValue: number | null;
    timesIncrement: 5 | 10 | 15 | 30 | 60;
}
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<DatePickerHourProps & React.RefAttributes<HTMLButtonElement>>>;
export default _default;
