import React, { memo, } from "react";
import { buildClassNames, } from "../lib/helpers";
import { isSameDay, } from "./helpers";
import { useDayTitle, useMemoizedSameDay, useValueSetter, } from "./hooks";
function DatePickerDay({ changeHandler, date, enableRange, endDate, isCompact, isDisabled, now, startDate, }) {
    const title = useDayTitle(date);
    const isToday = isSameDay(date, now);
    const isStartDate = useMemoizedSameDay(date, startDate);
    const isEndDate = useMemoizedSameDay(date, endDate);
    const isSelected = isStartDate || isEndDate;
    const isInRange = enableRange
        && startDate
        && endDate
        && !isStartDate
        && !isEndDate
        && date > startDate
        && date < endDate;
    const handleClickDay = useValueSetter(changeHandler, date, enableRange, endDate, isEndDate, isSelected, isStartDate, startDate);
    const wrapperClasses = buildClassNames({
        isCompact,
        isDisabled,
        isEndDate: isEndDate && !!startDate,
        isInRange,
        isStartDate: isStartDate && !!endDate,
        isToday,
    });
    const buttonClasses = buildClassNames({
        isCompact,
        isDisabled,
        isSelected,
        isToday,
    });
    return (React.createElement("div", { className: `qmDatePickerCalDay ${wrapperClasses}` },
        React.createElement("button", { className: `qmDatePickerCalBtn ${buttonClasses}`, disabled: isDisabled, onClick: handleClickDay, title: title }, date.getDate())));
}
DatePickerDay.displayName = "DatePickerDay";
export default memo(DatePickerDay);
//# sourceMappingURL=DatePickerDay.js.map