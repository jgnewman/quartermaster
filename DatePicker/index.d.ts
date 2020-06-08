import "./styles.css";
import React from "react";
import type { FauxChangeEventHandler } from "../lib/helperTypes";
export interface DatePickerProps {
    changeHandler?: FauxChangeEventHandler;
    className?: string;
    disablePast?: boolean;
    errorText?: string;
    hasError?: boolean;
    id?: string;
    isCompact?: boolean;
    isDisabled?: boolean;
    isRequired?: boolean;
    label?: string;
    placeholder?: string;
    position?: "top" | "bottom";
    showTimes?: boolean;
    tabIndex?: number;
    timesIncrement?: 5 | 10 | 15 | 30 | 60;
    value?: Date | number | string | null;
}
declare function DatePicker({ changeHandler, className, disablePast, errorText, hasError, id, isCompact, isDisabled, isRequired, label, placeholder, position, showTimes, tabIndex, timesIncrement, value, }: DatePickerProps): JSX.Element;
declare namespace DatePicker {
    var displayName: string;
}
declare const _default: React.MemoExoticComponent<typeof DatePicker>;
export default _default;
