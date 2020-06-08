import "./styles.css";
import React, { forwardRef, memo, useRef, } from "react";
import { buildClassNames, noopEvtHandler, } from "../lib/helpers";
import { useFocusHandlers, useInputChecker, useMergedRefs, } from "../lib/hooks";
import Text from "../Text";
import Dot from "../icons/Dot";
const RadioButton = forwardRef(function ({ changeHandler, className, groupName, id, isChecked, isDisabled, label, tabIndex, value, }, ref) {
    const inputRef = useRef(null);
    const mergedRef = useMergedRefs(ref, inputRef);
    const handleOverlayClick = useInputChecker(inputRef);
    const { isFocused, handleFocus, handleBlur, } = useFocusHandlers();
    const isEnabled = !isDisabled;
    const labelProps = {};
    const boxProps = {};
    if (id) {
        labelProps.htmlFor = id;
        boxProps.id = id;
    }
    if (tabIndex) {
        boxProps.tabIndex = tabIndex;
    }
    if (groupName) {
        boxProps.name = groupName;
    }
    if (changeHandler) {
        boxProps.onChange = changeHandler;
    }
    if (value) {
        boxProps.value = value;
    }
    const containerClasses = buildClassNames({
        isChecked,
        isDisabled,
        isEnabled,
    });
    const overlayClasses = buildClassNames({
        isChecked,
        isFocused,
    });
    const labelClasses = buildClassNames({
        isChecked,
        isDisabled,
        isEnabled,
    });
    return (React.createElement("span", { className: `qmRadioContainer ${containerClasses} ${className || ""}` },
        React.createElement("span", { className: "qmRadioFauxWrapper", onClick: isDisabled ? noopEvtHandler : handleOverlayClick },
            React.createElement("span", { className: "qmRadioCheckWrapper" },
                React.createElement("span", { "aria-hidden": true, className: `qmRadioOverlay ${overlayClasses}` }, isChecked && (React.createElement(Dot, { title: "checked", size: "l", className: "qmRadioDotIcon" })))),
            label && (React.createElement(Text, Object.assign({ className: `qmRadioLabel ${labelClasses}`, tag: "label" }, labelProps), label))),
        React.createElement("input", Object.assign({ ref: mergedRef, checked: isChecked, className: "qmRadioNative", disabled: !!isDisabled, type: "radio", onFocus: handleFocus, onBlur: handleBlur }, boxProps))));
});
RadioButton.displayName = "RadioButton";
export default memo(RadioButton);
//# sourceMappingURL=index.js.map