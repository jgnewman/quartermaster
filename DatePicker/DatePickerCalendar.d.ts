import React, { Dispatch, SetStateAction } from "react";
import type { DatePickerChangeHandler } from "./types";
interface DatePickerCalendarProps {
    changeHandler?: DatePickerChangeHandler;
    currentView: Date;
    disablePast?: boolean;
    enableRange?: boolean;
    endDate: Date | null;
    isCompact?: boolean;
    now: Date;
    setCurrentView: Dispatch<SetStateAction<Date>>;
    startDate: Date | null;
    weekStartsOnMonday?: boolean;
}
declare function DatePickerCalendar({ changeHandler, currentView, disablePast, enableRange, endDate, isCompact, now, setCurrentView, startDate, weekStartsOnMonday, }: DatePickerCalendarProps): JSX.Element;
declare namespace DatePickerCalendar {
    var displayName: string;
}
declare const _default: React.MemoExoticComponent<typeof DatePickerCalendar>;
export default _default;
