import "./styles.css";
import React, { forwardRef, memo, useCallback, useRef, } from "react";
import { buildClassNames } from "../lib/helpers";
import { useFocusHandlers } from "../lib/internalHooks";
import { useMergedRefs } from "../hooks";
import Text from "../Text";
import Spinner from "../Spinner";
function useClickHandler(buttonRef, clickHandler) {
    return useCallback(function (evt) {
        const { current: currentRef } = buttonRef;
        currentRef && currentRef.blur();
        clickHandler && clickHandler(evt);
    }, [
        buttonRef,
        clickHandler,
    ]);
}
const Button = forwardRef(function ({ children, className, clickHandler, highlight, href, isCompact, isDisabled, isProcessing, tag, text, }, ref) {
    const isEnabled = !isDisabled && !isProcessing;
    const isNegative = highlight === "negative";
    const isPositive = highlight === "positive";
    const shouldApplyClickHandler = !!clickHandler && !isDisabled && !isProcessing;
    const buttonRef = useRef(null);
    const mergedRef = useMergedRefs(ref, buttonRef);
    const handleClick = useClickHandler(buttonRef, clickHandler);
    const { isFocused, handleFocus, handleBlur, } = useFocusHandlers();
    const dynamicProps = {
        ref: mergedRef,
    };
    if (shouldApplyClickHandler) {
        dynamicProps.onClick = handleClick;
    }
    if (!!isDisabled || isProcessing) {
        dynamicProps.disabled = true;
    }
    if (tag === "a" && href) {
        dynamicProps.href = href;
    }
    const containerClasses = buildClassNames({
        isCompact,
        isDisabled,
        isEnabled,
        isProcessing,
        isFocused,
        isNegative,
        isPositive,
    });
    dynamicProps.className = `qmButtonContainer ${containerClasses} ${className || ""}`;
    const content = (React.createElement(Text, { isBlock: true, className: "qmButtonContent", text: text }, children));
    const spinner = !isProcessing ? null : (React.createElement(Spinner, { className: "qmButtonSpinner", size: isCompact ? "m" : "i" }));
    switch (tag) {
        case "a":
            return (React.createElement("a", Object.assign({ onFocus: handleFocus, onBlur: handleBlur }, dynamicProps),
                spinner,
                content));
        case "button":
        default:
            return (React.createElement("button", Object.assign({ onFocus: handleFocus, onBlur: handleBlur }, dynamicProps),
                spinner,
                content));
    }
});
Button.displayName = "Button";
export default memo(Button);
//# sourceMappingURL=index.js.map