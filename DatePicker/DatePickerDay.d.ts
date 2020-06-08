import React from "react";
import type { FauxChangeEventHandler } from "../lib/helperTypes";
interface DatePickerButtonProps {
    changeHandler?: FauxChangeEventHandler;
    dateStamp: number;
    disablePast: boolean;
    isCompact: boolean;
    isDisabled: boolean;
    pickerValue: number | null;
    showTimes: boolean;
    timesIncrement: 5 | 10 | 15 | 30 | 60;
}
declare function DatePickerButton({ changeHandler, dateStamp, disablePast, isCompact, isDisabled, pickerValue, showTimes, timesIncrement, }: DatePickerButtonProps): JSX.Element;
declare namespace DatePickerButton {
    var displayName: string;
}
declare const _default: React.MemoExoticComponent<typeof DatePickerButton>;
export default _default;
