import "./styles.css";
import React, { forwardRef, memo, useRef, } from "react";
import { buildClassNames } from "../lib/helpers";
import { useFocusHandlers } from "../lib/internalHooks";
import { useMergedRefs, usePrevious, } from "../hooks";
import Label from "../Label";
import CharLimitCounter from "./CharLimitCounter";
import { usePreventInputDecision, useTruncateValueDecision, useChangeHandler, useKeyUpHandler, useCleanupField, } from "./hooks";
const TextField = forwardRef(function ({ blurHandler, changeHandler, charLimit, charLimitIsMinimum = false, children, className, dangerouslyAutoTruncateLimitBreakingValues = false, defaultValue, enableTextAreaResize, errorText, focusHandler, hasError, hideCharLimitProgress, hideCharLimitText, id, ignoreLastPass, isCompact, isDisabled, isReadOnly, isRequired, keyUpHandler, label, placeholder, preventInputAtLimit = false, tabIndex, type, value, }, ref) {
    const inputRef = useRef(null);
    const mergedRef = useMergedRefs(ref, inputRef);
    const prevVal = usePrevious(value);
    const { isFocused, handleFocus, handleBlur, } = useFocusHandlers(focusHandler, blurHandler);
    const shouldPreventInput = usePreventInputDecision(charLimit, charLimitIsMinimum, preventInputAtLimit, value);
    const maybeTruncateValue = useTruncateValueDecision(inputRef, charLimit, dangerouslyAutoTruncateLimitBreakingValues, charLimitIsMinimum, preventInputAtLimit, type, value);
    const handleChange = useChangeHandler(type, changeHandler, inputRef, shouldPreventInput);
    const handleKeyUp = useKeyUpHandler(keyUpHandler, shouldPreventInput);
    useCleanupField(inputRef, maybeTruncateValue, prevVal, type, value);
    const isTextArea = type === "textarea";
    const isEnabled = !isDisabled;
    const isField = !isTextArea;
    const noResize = !enableTextAreaResize;
    const hasCharLimit = !!charLimit;
    const dynamicProps = {};
    if (typeof id === "string") {
        dynamicProps.id = id;
    }
    if (typeof tabIndex === "number") {
        dynamicProps.tabIndex = tabIndex;
    }
    if (typeof value === "string") {
        dynamicProps.value = value;
    }
    if (!dynamicProps.value && typeof defaultValue === "string") {
        dynamicProps.defaultValue = defaultValue;
    }
    if (ignoreLastPass) {
        dynamicProps["data-lpignore"] = true;
    }
    const labelProps = {
        className: "qmTextFieldLabel",
        isRequired,
    };
    if (id) {
        labelProps.htmlFor = id;
    }
    // We want to display a char count that looks something like "22 / 25".
    // The padding we need is calculated as twice the charlimit + 3 chars for the separator
    // all divided by 2 since the width of a character is about half an em.
    const fieldStyle = {};
    if (!isTextArea && charLimit) {
        fieldStyle.paddingRight = `${(charLimit.toString().length * 2 + 3) / 2}em`;
    }
    const containerClasses = buildClassNames({
        hasCharLimit,
        hasError,
        isCompact,
        isDisabled,
        isEnabled,
        isField,
        isFocused,
        isRequired,
        isTextArea,
        noResize,
    });
    const inputWrapperClasses = buildClassNames({
        isDisabled,
        isEnabled,
        isField,
        isTextArea,
    });
    const inputClasses = buildClassNames({
        hasCharLimit,
        hasError,
        isCompact,
        isDisabled,
        isEnabled,
        isField,
        isFocused,
        isReadOnly,
        isTextArea,
        noResize,
    });
    return (React.createElement("div", { className: `qmTextFieldContainer ${containerClasses} ${className || ""}` },
        label && React.createElement(Label, Object.assign({ text: label }, labelProps)),
        React.createElement("div", { className: `qmTextFieldInputWrapper ${inputWrapperClasses}` },
            isTextArea && (React.createElement("textarea", Object.assign({ className: `qmTextFieldInput ${inputClasses}`, disabled: !!isDisabled, onChange: handleChange, onKeyUp: handleKeyUp, onFocus: handleFocus, onBlur: handleBlur, placeholder: placeholder || "", readOnly: !!isReadOnly, ref: mergedRef }, dynamicProps))),
            !isTextArea && (React.createElement("input", Object.assign({ className: `qmTextFieldInput ${inputClasses}`, disabled: !!isDisabled, onChange: handleChange, onKeyUp: handleKeyUp, onFocus: handleFocus, onBlur: handleBlur, placeholder: placeholder || "", readOnly: !!isReadOnly, ref: mergedRef, type: type || "text", style: fieldStyle }, dynamicProps))),
            charLimit && (React.createElement(CharLimitCounter, { className: buildClassNames({ isEnabled, isDisabled }), count: typeof value === "string" ? value.length : 0, hideProgressBar: !!hideCharLimitProgress, hideText: !!hideCharLimitText, isCompact: !!isCompact, isTextArea: isTextArea, limit: charLimit, limitIsMinimum: !!charLimitIsMinimum }))),
        hasError && errorText && (React.createElement("span", { className: "qmTextFieldError" }, errorText)),
        children));
});
TextField.displayName = "TextField";
export default memo(TextField);
//# sourceMappingURL=index.js.map