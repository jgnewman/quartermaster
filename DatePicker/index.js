import "./styles.css";
import React, { memo, useRef, useState, } from "react";
import { buildClassNames } from "../lib/helpers";
import Grid from "../Grid";
import IconButton from "../IconButton";
import Label from "../Label";
import Text from "../Text";
import TextField from "../TextField";
import Calendar from "../icons/Calendar";
import Ex from "../icons/Ex";
import Reload from "../icons/Reload";
import Triangle from "../icons/Triangle";
import DatePickerCalendar from "./DatePickerCalendar";
import DatePickerTimes from "./DatePickerTimes";
import { useCalendarState, useCalendarTitle, useCloseCalendarOnClickAway, useDateStamp, useFieldFocuser, useFieldValue, useMonthDecrementor, useMonthIncrementor, useMonthResetter, useValueResetter, } from "./hooks";
function DatePicker({ changeHandler, className, disablePast = false, errorText, hasError, id, isCompact = false, isDisabled = false, isRequired = false, label, placeholder, position = "bottom", showTimes = false, tabIndex, timesIncrement = 60, value, }) {
    const dateStamp = useDateStamp(value);
    const calendarRef = useRef(null);
    const fieldRef = useRef(null);
    const { isOpen, closeCalendar, openCalendar } = useCalendarState(false);
    const [currentView, setCurrentView] = useState(dateStamp || Date.now());
    const fieldValue = useFieldValue(dateStamp, showTimes);
    const calendarTitle = useCalendarTitle(currentView);
    const decrementView = useMonthDecrementor(currentView, setCurrentView);
    const incrementView = useMonthIncrementor(currentView, setCurrentView);
    const resetView = useMonthResetter(setCurrentView);
    const focusTextField = useFieldFocuser(fieldRef);
    const clearValue = useValueResetter(changeHandler);
    useCloseCalendarOnClickAway(calendarRef, closeCalendar, isOpen);
    const labelProps = {
        className: "qmTextFieldLabel",
        isRequired,
    };
    if (id) {
        labelProps.htmlFor = id;
    }
    const positionClasses = buildClassNames({
        isTop: position === "top",
        isBottom: position === "bottom",
    });
    const fieldClasses = buildClassNames({
        hasValue: !!value,
    });
    return (React.createElement("div", { className: `qmDatePickerContainer ${className || ""}` },
        label && React.createElement(Label, Object.assign({ text: label }, labelProps)),
        React.createElement("div", { className: "qmDatePickerFieldWrapper" },
            React.createElement(TextField, { className: `qmDatePickerField ${fieldClasses}`, errorText: errorText, focusHandler: openCalendar, hasError: hasError, id: id, ignoreLastPass: true, isCompact: isCompact, isDisabled: isDisabled, isReadOnly: true, isRequired: isRequired, placeholder: placeholder, ref: fieldRef, tabIndex: tabIndex, type: "text", value: fieldValue }),
            React.createElement("div", { className: "qmDatePickerOverlay", onClick: focusTextField }),
            React.createElement("div", { className: "qmDatePickerIcons" },
                value && (React.createElement("button", { className: `qmDatePickerClearButton`, onClick: clearValue },
                    React.createElement(Ex, { className: "qmDatePickerIcon qmDatePickerClearIcon", size: "s", title: "Clear date" }))),
                React.createElement("div", { className: "qmDatePickerIconWrapper", role: "button", onClick: focusTextField },
                    React.createElement(Calendar, { className: "qmDatePickerIcon qmDatePickerDateIcon", size: "s", title: "Pick a date" }))),
            isOpen && (React.createElement("div", { className: `qmDatePickerDialog ${positionClasses}`, ref: calendarRef, "aria-expanded": isOpen },
                React.createElement("header", { className: "qmDatePickerHeader" },
                    React.createElement(Grid, { gutterW: "s" },
                        React.createElement("div", { className: "qmDatePickerMonthLeftWrapper" },
                            React.createElement(IconButton, { className: "qmDatePickerButton qmDatePickerMonthLeft", clickHandler: decrementView },
                                React.createElement(Triangle, { size: "s", rotate: 90, title: "Previous month" }))),
                        React.createElement("div", { className: "qmDatePickerTitle" },
                            React.createElement(Text, { className: "qmDatePickerTitleText", isBold: true }, calendarTitle),
                            React.createElement(IconButton, { className: "qmDatePickerButton qmDatePickerReset", clickHandler: resetView },
                                React.createElement(Reload, { size: "s", title: "Back to today" }))),
                        React.createElement("div", { className: "qmDatePickerMonthRightWrapper" },
                            React.createElement(IconButton, { className: "qmDatePickerButton qmDatePickerMonthRight", clickHandler: incrementView },
                                React.createElement(Triangle, { size: "s", rotate: 270, title: "Next month" }))))),
                React.createElement("div", { className: "qmDatePickerSelectorsWrapper" },
                    React.createElement(DatePickerCalendar, { changeHandler: changeHandler, currentView: currentView, dateStamp: dateStamp, disablePast: disablePast, isCompact: isCompact, showTimes: showTimes, timesIncrement: timesIncrement }),
                    showTimes && (React.createElement(DatePickerTimes, { changeHandler: changeHandler, dateStamp: dateStamp, disablePast: disablePast, isCompact: isCompact, timesIncrement: timesIncrement }))))))));
}
DatePicker.displayName = "DatePicker";
export default memo(DatePicker);
//# sourceMappingURL=index.js.map