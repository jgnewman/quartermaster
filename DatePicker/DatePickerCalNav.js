import React, { memo, } from "react";
import { buildClassNames, } from "../lib/helpers";
import Align from "../Align";
import Text from "../Text";
import Caret from "../icons/Caret";
import Reload from "../icons/Reload";
import { useCalendarMonthName, useDecrementMonth, useEnableLeftButton, useIncrementMonth, useRefreshView, } from "./hooks";
function DatePickerCalNav({ currentView, disablePast, isCompact, now, setCurrentView, }) {
    const monthName = useCalendarMonthName(currentView);
    const handleClickReload = useRefreshView(now, setCurrentView);
    const handleClickLeft = useDecrementMonth(currentView, setCurrentView);
    const handleClickRight = useIncrementMonth(currentView, setCurrentView);
    const shouldEnableLeftButton = useEnableLeftButton(currentView, disablePast, now);
    const navClasses = buildClassNames({
        isCompact,
    });
    return (React.createElement("header", { className: `qmDatePickerCalNav ${navClasses}` },
        React.createElement("div", { className: "qmDatePickerCalBtnWrapper" }, shouldEnableLeftButton && (React.createElement("button", { className: "qmDatePickerMonthBtn isLeft", onClick: handleClickLeft },
            React.createElement(Caret, { size: "s", rotate: 90 })))),
        React.createElement(Align, { className: "qmDatePickerCalTitle", justify: "center" },
            React.createElement(Text, { className: "qmDatePickerCalTitleText", text: monthName }),
            React.createElement("button", { className: "qmDatePickerMonthBtn isReload", onClick: handleClickReload },
                React.createElement(Reload, { size: "s" }))),
        React.createElement("div", { className: "qmDatePickerCalBtnWrapper" },
            React.createElement("button", { className: "qmDatePickerMonthBtn isRight", onClick: handleClickRight },
                React.createElement(Caret, { size: "s", rotate: 270 })))));
}
DatePickerCalNav.displayName = "DatePickerCalNav";
export default memo(DatePickerCalNav);
//# sourceMappingURL=DatePickerCalNav.js.map