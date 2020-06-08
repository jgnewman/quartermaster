import React from "react";
import type { FauxChangeEventHandler } from "../lib/helperTypes";
interface DatePickerTimesProps {
    changeHandler?: FauxChangeEventHandler;
    dateStamp: number | null;
    disablePast: boolean;
    isCompact: boolean;
    timesIncrement: 5 | 10 | 15 | 30 | 60;
}
declare function DatePickerTimes({ changeHandler, dateStamp, disablePast, isCompact, timesIncrement, }: DatePickerTimesProps): JSX.Element;
declare namespace DatePickerTimes {
    var displayName: string;
}
declare const _default: React.MemoExoticComponent<typeof DatePickerTimes>;
export default _default;
