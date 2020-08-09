import "./styles.css";
import React, { memo, useRef, useState, } from "react";
import { buildClassNames, } from "../lib/helpers";
import Label from "../Label";
import { setDateToNextIncrement, } from "./helpers";
import { useClickPicker, useDateRangeFromValue, useFocusInput, useCloseOnBlurContainer, useCloseOnClickAway, useFieldValue, } from "./hooks";
import DatePickerControls from "./DatePickerControls";
import DatePickerCalendar from "./DatePickerCalendar";
import DatePickerTimes from "./DatePickerTimes";
function DatePicker({ changeHandler, className, disablePast, enableRange, enableTimes, errorText, hasError, id, isCompact, isDisabled, isRequired, label, placeholder, position = "bottom", timeIncrement = 60, value = null, weekStartsOnMonday, }) {
    const isTop = position === "top";
    const isBottom = !isTop;
    const now = new Date();
    enableTimes && setDateToNextIncrement(now, timeIncrement);
    const [startDate, endDate] = useDateRangeFromValue(disablePast, enableRange, enableTimes, now, timeIncrement, value);
    const [currentView, setCurrentView] = useState(startDate || now);
    const [isOpen, setOpen] = useState(false);
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const selectorsRef = useRef(null);
    const confirmRef = useRef(null);
    const handleClickPicker = useClickPicker(confirmRef, isDisabled, setOpen);
    const handleFocusInput = useFocusInput(setOpen);
    const fieldValue = useFieldValue(enableRange, enableTimes, endDate, startDate);
    useCloseOnClickAway(contentRef, isOpen, selectorsRef, setOpen);
    useCloseOnBlurContainer(containerRef, isOpen, setOpen);
    const labelProps = {
        className: "qmTextFieldLabel",
        isRequired,
    };
    if (id) {
        labelProps.htmlFor = id;
    }
    const contentClasses = buildClassNames({
        isOpen,
    });
    const inputClasses = buildClassNames({
        isCompact,
        isDisabled,
        isOpen,
    });
    const selectorsClasses = buildClassNames({
        isBottom,
        isCompact,
        isTop,
    });
    return (React.createElement("div", { className: `qmDatePickerContainer ${className || ""}`, ref: containerRef },
        label && React.createElement(Label, Object.assign({ text: label }, labelProps)),
        React.createElement("div", { className: `qmDatePickerContent ${contentClasses}`, ref: contentRef, onClick: handleClickPicker },
            React.createElement("input", { className: `qmDatePickerInput ${inputClasses}`, disabled: !!isDisabled, id: id, onFocus: handleFocusInput, placeholder: placeholder || "", readOnly: true, type: "text", value: fieldValue }),
            isOpen && (React.createElement("div", { className: `qmDatePickerSelectors ${selectorsClasses}`, ref: selectorsRef },
                React.createElement(DatePickerCalendar, { changeHandler: changeHandler, currentView: currentView, disablePast: disablePast, enableRange: enableRange, endDate: endDate, isCompact: isCompact, now: now, setCurrentView: setCurrentView, startDate: startDate, weekStartsOnMonday: weekStartsOnMonday }),
                enableTimes && (React.createElement(DatePickerTimes, { changeHandler: changeHandler, disablePast: disablePast, enableRange: enableRange, endDate: endDate, isCompact: isCompact, now: now, startDate: startDate, timeIncrement: timeIncrement })))),
            React.createElement(DatePickerControls, { changeHandler: changeHandler, enableRange: enableRange, isCompact: isCompact, isDisabled: isDisabled, isOpen: isOpen, setOpen: setOpen, ref: confirmRef })),
        hasError && errorText && (React.createElement("span", { className: "qmDatePickerError" }, errorText))));
}
DatePicker.displayName = "DatePicker";
export default memo(DatePicker);
//# sourceMappingURL=index.js.map