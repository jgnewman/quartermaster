import React, { memo, useRef, } from "react";
import { buildClassNames } from "../lib/helpers";
import Text from "../Text";
import { getHoursForDay } from "./helpers";
import { useScrollToSelectedTime } from "./hooks";
import DatePickerHour from "./DatePickerHour";
function DatePickerTimes({ changeHandler, dateStamp, disablePast, isCompact, timesIncrement, }) {
    const now = Date.now();
    const hours = getHoursForDay(dateStamp || now, timesIncrement);
    const totalHours = hours.length;
    const scrollAreaRef = useRef(null);
    const firstEnabledButtonRef = useRef(null);
    const enabledButtonIndexRef = useRef(0);
    let foundEnabledButton = false;
    useScrollToSelectedTime(enabledButtonIndexRef, firstEnabledButtonRef, scrollAreaRef, totalHours);
    const scrollAreaClasses = buildClassNames({
        isCompact,
    });
    return (React.createElement("div", { className: "qmDatePickerTimes" },
        React.createElement(Text, { className: "qmDatePickerTimeTitle", isBold: true, isSmaller: true }, "Time"),
        React.createElement("div", { className: `qmDatePickerHours ${scrollAreaClasses}`, ref: scrollAreaRef }, hours.map((hour, index) => {
            const isBeforeNow = hour < now;
            const isDisabled = disablePast ? isBeforeNow : false;
            const isFirstEnabledButton = !isBeforeNow && !isDisabled && !foundEnabledButton;
            if (isFirstEnabledButton) {
                foundEnabledButton = true;
                enabledButtonIndexRef.current = index;
            }
            return (React.createElement(DatePickerHour, { key: hour, ref: isFirstEnabledButton ? firstEnabledButtonRef : null, changeHandler: changeHandler, dateStamp: hour, disablePast: disablePast, isCompact: isCompact, isDisabled: isDisabled, pickerValue: dateStamp, timesIncrement: timesIncrement }));
        }))));
}
DatePickerTimes.displayName = "DatePickerTimes";
export default memo(DatePickerTimes);
//# sourceMappingURL=DatePickerTimes.js.map