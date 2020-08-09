import "./styles.css";
import React, { memo, useMemo, useRef, useState, } from "react";
import { buildClassNames } from "../lib/helpers";
import { useRefArray, } from "../lib/internalHooks";
import Label from "../Label";
import Ex from "../icons/Ex";
import Caret from "../icons/Caret";
import { useValueSelector, useCloseSelectOnClickAway, useKeyDownHandler, useClickOptionHandler, useSiblingOptionFocuser, useOptionKeyDownHandler, useFocusHandler, useBlurHandler, useClearButtonHandler, useClearButtonFocuser, } from "./hooks";
function useOptionsArray(addOptionRef, currentOptions, options, resetOptionRefs, selectValue, value) {
    const focusSiblingOption = useSiblingOptionFocuser(currentOptions);
    const handleClickOption = useClickOptionHandler(selectValue);
    const handleKeyDownOption = useOptionKeyDownHandler(focusSiblingOption, selectValue);
    return useMemo(function () {
        const menuOptionsArray = [];
        let selectedLabel = null;
        resetOptionRefs();
        options.forEach(({ label, value: optValue }) => {
            const isSelected = value === optValue;
            if (isSelected) {
                selectedLabel = label;
            }
            menuOptionsArray.push(React.createElement("span", { key: optValue, ref: addOptionRef, tabIndex: 0, className: `qmSelectMenuOption ${buildClassNames({ isSelected })}`, "data-value": optValue, onClick: handleClickOption, onKeyDown: handleKeyDownOption }, label));
        });
        return { menuOptionsArray, selectedLabel };
    }, [
        options,
        resetOptionRefs,
        addOptionRef,
        value,
        handleClickOption,
        handleKeyDownOption,
    ]);
}
function Select({ changeHandler, className, id, isCompact = false, isDisabled = false, isRequired = false, label, options, placeholder = "Select...", position = "bottom", value, }) {
    const [isFocused, setIsFocused] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);
    const [currentOptions, addOptionRef, resetOptionRefs] = useRefArray([]);
    const selectValue = useValueSelector(isOpen, setIsOpen, changeHandler);
    const handleKeyDownSelect = useKeyDownHandler(value, currentOptions);
    const handleFocusSelect = useFocusHandler(isDisabled, setIsFocused, setIsOpen);
    const handleBlurSelect = useBlurHandler(setIsFocused);
    const handleClickClearButton = useClearButtonHandler(isDisabled, selectValue);
    const handleFocusClearButton = useClearButtonFocuser();
    const { menuOptionsArray, selectedLabel } = useOptionsArray(addOptionRef, currentOptions, options, resetOptionRefs, selectValue, value);
    useCloseSelectOnClickAway(wrapperRef, setIsOpen);
    const textValue = value ? selectedLabel : placeholder;
    const hasSelectedValue = !!value;
    const isEnabled = !isDisabled;
    const isPlaceholder = !hasSelectedValue;
    const clickableWrapperProps = {};
    const labelProps = {
        className: "qmSelectLabel",
        isRequired,
    };
    if (id) {
        const labelId = `${id}-qmLabel`;
        clickableWrapperProps.id = id;
        clickableWrapperProps["aria-labelledby"] = labelId;
        labelProps.id = labelId;
        labelProps.htmlFor = id;
    }
    const containerClasses = buildClassNames({
        isCompact,
        isDisabled,
        isEnabled,
        isOpen,
        isRequired,
    });
    const clickableWrapperClasses = buildClassNames({
        isCompact,
        isFocused,
    });
    const displayClasses = buildClassNames({
        isDisabled,
        isEnabled,
        isPlaceholder,
    });
    const buttonClasses = buildClassNames({
        isDisabled,
        isEnabled,
    });
    const positionClasses = buildClassNames({
        isTop: position === "top",
        isBottom: position === "bottom",
    });
    return (React.createElement("div", { className: `qmSelectContainer ${containerClasses} ${className || ""}` },
        label && React.createElement(Label, Object.assign({ text: label }, labelProps)),
        React.createElement("div", { className: "qmSelectContentWrapper", ref: wrapperRef },
            React.createElement("div", Object.assign({ className: `qmSelectClickableWrapper ${clickableWrapperClasses}`, role: "button", tabIndex: 0, "aria-disabled": isDisabled, onFocus: handleFocusSelect, onBlur: handleBlurSelect, onKeyDown: handleKeyDownSelect }, clickableWrapperProps),
                React.createElement("div", { className: `qmSelectDisplay ${displayClasses}` },
                    React.createElement("span", { className: "qmSelectValue" }, textValue)),
                hasSelectedValue && (React.createElement("button", { className: `qmSelectClearIconWrapper ${buttonClasses}`, disabled: isDisabled, onClick: handleClickClearButton, onFocus: handleFocusClearButton },
                    React.createElement(Ex, { className: "qmSelectIcon qmSelectClearIcon", size: "s", title: "Clear Selection" }))),
                React.createElement("div", { className: `qmSelectOpenIconWrapper ${buttonClasses}` },
                    React.createElement(Caret, { className: `qmSelectIcon qmSelectOpenIcon ${positionClasses}`, size: "s", title: "Open" }))),
            isOpen && (React.createElement("div", { className: `qmSelectMenu ${positionClasses}`, role: "list", "aria-expanded": isOpen }, menuOptionsArray)))));
}
Select.displayName = "Select";
export default memo(Select);
//# sourceMappingURL=index.js.map