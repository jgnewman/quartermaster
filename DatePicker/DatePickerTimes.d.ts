import React from "react";
import type { DatePickerChangeHandler } from "./types";
interface DatePickerTimesProps {
    changeHandler?: DatePickerChangeHandler;
    disablePast?: boolean;
    enableRange?: boolean;
    endDate: Date | null;
    isCompact?: boolean;
    now: Date;
    startDate: Date | null;
    timeIncrement: 5 | 10 | 15 | 30 | 60;
}
declare function DatePickerTimes({ changeHandler, disablePast, enableRange, endDate, isCompact, now, startDate, timeIncrement, }: DatePickerTimesProps): JSX.Element;
declare namespace DatePickerTimes {
    var displayName: string;
}
declare const _default: React.MemoExoticComponent<typeof DatePickerTimes>;
export default _default;
