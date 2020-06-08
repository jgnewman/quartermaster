import React from "react";
import type { FauxChangeEventHandler } from "../lib/helperTypes";
interface DatePickerCalendarProps {
    changeHandler?: FauxChangeEventHandler;
    currentView: number;
    dateStamp: number | null;
    disablePast: boolean;
    isCompact: boolean;
    showTimes: boolean;
    timesIncrement: 5 | 10 | 15 | 30 | 60;
}
declare function DatePickerCalendar({ changeHandler, currentView, dateStamp, disablePast, isCompact, showTimes, timesIncrement, }: DatePickerCalendarProps): JSX.Element;
declare namespace DatePickerCalendar {
    var displayName: string;
}
declare const _default: React.MemoExoticComponent<typeof DatePickerCalendar>;
export default _default;
