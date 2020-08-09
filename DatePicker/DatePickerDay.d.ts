import React from "react";
import type { DatePickerChangeHandler } from "./types";
interface DatePickerDayProps {
    changeHandler?: DatePickerChangeHandler;
    date: Date;
    enableRange?: boolean;
    endDate: Date | null;
    isCompact?: boolean;
    isDisabled: boolean;
    now: Date;
    startDate: Date | null;
}
declare function DatePickerDay({ changeHandler, date, enableRange, endDate, isCompact, isDisabled, now, startDate, }: DatePickerDayProps): JSX.Element;
declare namespace DatePickerDay {
    var displayName: string;
}
declare const _default: React.MemoExoticComponent<typeof DatePickerDay>;
export default _default;
