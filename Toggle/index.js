import "./styles.css";
import React, { forwardRef, memo, useRef, } from "react";
import Text from "../Text";
import Checkmark from "../icons/Checkmark";
import { buildClassNames, noopEvtHandler, } from "../lib/helpers";
import { useFocusHandlers, useInputChecker, } from "../lib/internalHooks";
import { useMergedRefs, } from "../hooks";
const Toggle = forwardRef(function ({ changeHandler, className, id, isChecked, isDisabled, label, tabIndex, value, }, ref) {
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
    const sliderAndCheckmarkClasses = buildClassNames({
        isChecked,
    });
    return (React.createElement("span", { className: `qmToggleContainer ${containerClasses} ${className || ""}` },
        React.createElement("span", { className: "qmToggleFauxWrapper", onClick: isDisabled ? noopEvtHandler : handleOverlayClick },
            React.createElement("span", { className: "qmToggleCheckWrapper" },
                React.createElement("span", { "aria-hidden": true, className: `qmToggleOverlay ${overlayClasses}` },
                    React.createElement(Checkmark, { className: `qmToggleCheckmark ${sliderAndCheckmarkClasses}`, size: "s" }),
                    React.createElement("span", { className: `qmToggleSlider ${sliderAndCheckmarkClasses}` }))),
            label && (React.createElement(Text, Object.assign({ className: `qmToggleLabel ${labelClasses}`, tag: "label", text: label }, labelProps)))),
        React.createElement("input", Object.assign({ ref: mergedRef, checked: isChecked, className: "qmToggleNative", disabled: !!isDisabled, type: "checkbox", onFocus: handleFocus, onBlur: handleBlur }, boxProps))));
});
Toggle.displayName = "Toggle";
export default memo(Toggle);
//# sourceMappingURL=index.js.map