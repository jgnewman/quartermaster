import React, { memo } from "react";
import { buildClassNames } from "../lib/helpers";
import { isSameDay } from "./helpers";
import { useFieldValue, useValueSelector, } from "./hooks";
function DatePickerButton({ changeHandler, dateStamp, disablePast, isCompact, isDisabled, pickerValue, showTimes, timesIncrement, }) {
    const now = Date.now();
    const buttonDay = (new Date(dateStamp)).getDate();
    const buttonTitle = useFieldValue(dateStamp);
    const isSelected = pickerValue ? isSameDay(pickerValue, dateStamp) : false;
    const isToday = isSameDay(now, dateStamp);
    const selectValue = useValueSelector(changeHandler, dateStamp, disablePast, isSelected, showTimes, timesIncrement);
    const buttonClasses = buildClassNames({
        isCompact,
        isDisabled,
        isSelected,
        isToday,
    });
    return (React.createElement("button", { className: `qmDatePickerDay ${buttonClasses}`, title: buttonTitle, disabled: isDisabled, onClick: selectValue }, buttonDay));
}
DatePickerButton.displayName = "DatePickerButton";
export default memo(DatePickerButton);
//# sourceMappingURL=DatePickerDay.js.map