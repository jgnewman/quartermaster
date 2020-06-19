import React, { memo, } from "react";
import { buildClassNames, } from "../lib/helpers";
import { useCalendarData, } from "./hooks";
import DatePickerCalNav from "./DatePickerCalNav";
import DatePickerDay from "./DatePickerDay";
const sunTitles = ["S", "M", "T", "W", "T", "F", "S"];
const monTitles = ["M", "T", "W", "T", "F", "S", "S"];
function DatePickerCalendar({ changeHandler, currentView, disablePast, enableRange, endDate, isCompact, now, setCurrentView, startDate, weekStartsOnMonday, }) {
    const titles = weekStartsOnMonday ? monTitles : sunTitles;
    const referenceYear = currentView.getFullYear();
    const referenceMonth = currentView.getMonth();
    const calendarData = useCalendarData(disablePast, referenceMonth, referenceYear, weekStartsOnMonday);
    const wrapperClasses = buildClassNames({
        isCompact,
    });
    const colHeadClasses = wrapperClasses;
    return (React.createElement("div", { className: `qmDatePickerCal ${wrapperClasses}` },
        React.createElement(DatePickerCalNav, { currentView: currentView, disablePast: disablePast, isCompact: isCompact, now: now, setCurrentView: setCurrentView }),
        React.createElement("section", { className: "qmDatePickerCalHead" }, titles.map((letter, index) => (React.createElement("span", { key: index, className: `qmDatePickerCalColHead ${colHeadClasses}` }, letter)))),
        React.createElement("section", { className: "qmDatePickerCalBody", role: "list", "aria-expanded": true }, calendarData.map((row, rowIndex) => row.map(({ isDisabled, date }, dayIndex) => (React.createElement(DatePickerDay, { key: `${rowIndex}-${dayIndex}`, changeHandler: changeHandler, date: date, enableRange: enableRange, endDate: endDate, isCompact: isCompact, isDisabled: isDisabled, now: now, startDate: startDate })))))));
}
DatePickerCalendar.displayName = "DatePickerCalendar";
export default memo(DatePickerCalendar);
//# sourceMappingURL=DatePickerCalendar.js.map