import React, { memo } from "react";
import Text from "../Text";
import DatePickerDay from "./DatePickerDay";
import { useCalendarData } from "./hooks";
function DatePickerCalendar({ changeHandler, currentView, dateStamp, disablePast, isCompact, showTimes, timesIncrement, }) {
    const calendarRows = useCalendarData(currentView, disablePast);
    return (React.createElement("div", { className: "qmDatePickerCalendar" },
        React.createElement("table", { className: "qmDatePickerDayTable" },
            React.createElement("thead", { className: "qmDatePickerTHead" },
                React.createElement("tr", null, ["S", "M", "T", "W", "T", "F", "S"].map((letter, index) => (React.createElement("th", { key: index },
                    React.createElement(Text, { isBold: true, isSmaller: true }, letter)))))),
            React.createElement("tbody", null, calendarRows.map((row, rowIndex) => (React.createElement("tr", { key: rowIndex }, row.map(({ isDisabled, date }, dayIndex) => (React.createElement("td", { key: `${rowIndex}${dayIndex}` },
                React.createElement(DatePickerDay, { changeHandler: changeHandler, dateStamp: date.getTime(), disablePast: disablePast, isCompact: isCompact, isDisabled: isDisabled, pickerValue: dateStamp, showTimes: showTimes, timesIncrement: timesIncrement })))))))))));
}
DatePickerCalendar.displayName = "DatePickerCalendar";
export default memo(DatePickerCalendar);
//# sourceMappingURL=DatePickerCalendar.js.map