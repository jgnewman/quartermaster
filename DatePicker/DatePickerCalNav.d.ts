import React, { Dispatch, SetStateAction } from "react";
interface DatePickerCalNavProps {
    currentView: Date;
    disablePast?: boolean;
    isCompact?: boolean;
    now: Date;
    setCurrentView: Dispatch<SetStateAction<Date>>;
}
declare function DatePickerCalNav({ currentView, disablePast, isCompact, now, setCurrentView, }: DatePickerCalNavProps): JSX.Element;
declare namespace DatePickerCalNav {
    var displayName: string;
}
declare const _default: React.MemoExoticComponent<typeof DatePickerCalNav>;
export default _default;
