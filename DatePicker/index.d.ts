import "./styles.css";
import React from "react";
import type { DatePickerChangeHandler, ValidValue, ValidValueRange } from "./types";
export interface DatePickerProps {
    changeHandler?: DatePickerChangeHandler;
    className?: string;
    disablePast?: boolean;
    enableRange?: boolean;
    enableTimes?: boolean;
    errorText?: string;
    hasError?: boolean;
    id?: string;
    isCompact?: boolean;
    isDisabled?: boolean;
    isRequired?: boolean;
    label?: string;
    placeholder?: string;
    position?: "top" | "bottom";
    timeIncrement?: 5 | 10 | 15 | 30 | 60;
    value?: ValidValue | ValidValueRange;
    weekStartsOnMonday?: boolean;
}
declare function DatePicker({ changeHandler, className, disablePast, enableRange, enableTimes, errorText, hasError, id, isCompact, isDisabled, isRequired, label, placeholder, position, timeIncrement, value, weekStartsOnMonday, }: DatePickerProps): JSX.Element;
declare namespace DatePicker {
    var displayName: string;
}
declare const _default: React.MemoExoticComponent<typeof DatePicker>;
export default _default;
