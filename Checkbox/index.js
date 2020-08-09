import "./styles.css";
import React, { forwardRef, memo, useRef, } from "react";
import { buildClassNames, noopEvtHandler, } from "../lib/helpers";
import { useFocusHandlers, useInputChecker, } from "../lib/internalHooks";
import { useMergedRefs, } from "../hooks";
import Text from "../Text";
import Checkmark from "../icons/Checkmark";
const Checkbox = forwardRef(function ({ changeHandler, className, id, isChecked, isDisabled, label, tabIndex, value, }, ref) {
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
    const labelClasses = buildClassNames({
        isChecked,
        isDisabled,
        isEnabled,
    });
    const overlayClasses = buildClassNames({
        isChecked,
        isFocused,
    });
    return (React.createElement("span", { className: `qmCheckboxContainer ${containerClasses} ${className || ""}` },
        React.createElement("span", { className: "qmCheckboxFauxWrapper", onClick: isDisabled ? noopEvtHandler : handleOverlayClick },
            React.createElement("span", { className: "qmCheckboxCheckWrapper" },
                React.createElement("span", { "aria-hidden": true, className: `qmCheckboxOverlay ${overlayClasses}` }, isChecked && (React.createElement(Checkmark, { className: "qmCheckboxCheckmark", size: "s" })))),
            label && (React.createElement(Text, Object.assign({ className: `qmCheckboxLabel ${labelClasses}`, tag: "label", text: label }, labelProps)))),
        React.createElement("input", Object.assign({ ref: mergedRef, checked: isChecked, className: "qmCheckboxNative", disabled: !!isDisabled, type: "checkbox", onFocus: handleFocus, onBlur: handleBlur }, boxProps))));
});
Checkbox.displayName = "Checkbox";
export default memo(Checkbox);
//# sourceMappingURL=index.js.map