import React, { forwardRef, memo, } from "react";
import { buildClassNames } from "../lib/helpers";
import { isSameTime } from "./helpers";
import { useValueSelector } from "./hooks";
const DatePickerHour = forwardRef(function ({ changeHandler, dateStamp, disablePast, isCompact, isDisabled, pickerValue, timesIncrement, }, ref) {
    const timeText = new Intl.DateTimeFormat("default", {
        hour: "numeric",
        minute: "2-digit",
    }).format(new Date(dateStamp));
    const isSelected = pickerValue ? isSameTime(pickerValue, dateStamp) : false;
    const showTimes = true;
    const selectValue = useValueSelector(changeHandler, dateStamp, disablePast, isSelected, showTimes, timesIncrement);
    const buttonClasses = buildClassNames({
        isCompact,
        isDisabled,
        isSelected,
    });
    return (React.createElement("button", { ref: ref, className: `qmDatePickerHour ${buttonClasses}`, disabled: isDisabled, onClick: selectValue }, timeText));
});
DatePickerHour.displayName = "DatePickerHour";
export default memo(DatePickerHour);
//# sourceMappingURL=DatePickerHour.js.map