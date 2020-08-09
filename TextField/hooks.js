import { useCallback, useEffect, } from "react";
import { manuallySetFieldValue, } from "../lib/helpers";
function scrollToEnd(type = "", inputRef) {
    const { current: currentInputRef } = inputRef;
    if (currentInputRef) {
        if (type === "textarea") {
            currentInputRef.scrollTop = currentInputRef.scrollHeight;
        }
        else {
            currentInputRef.scrollLeft = currentInputRef.scrollWidth;
        }
    }
}
export function usePreventInputDecision(charLimit, charLimitIsMinimum, preventInputAtLimit, value = "") {
    return useCallback(function (evtTarget) {
        const newValue = evtTarget.value;
        return typeof charLimit !== "undefined"
            && !charLimitIsMinimum
            && preventInputAtLimit
            && value.length >= charLimit
            && newValue.length > value.length;
    }, [
        charLimit,
        charLimitIsMinimum,
        preventInputAtLimit,
        value,
    ]);
}
export function useTruncateValueDecision(inputRef, charLimit, dangerouslyAutoTruncateLimitBreakingValues, charLimitIsMinimum, preventInputAtLimit, type, value = "") {
    return useCallback(function () {
        const { current: currentInputRef } = inputRef;
        const shouldAutoTrunc = charLimit &&
            !charLimitIsMinimum &&
            preventInputAtLimit &&
            dangerouslyAutoTruncateLimitBreakingValues &&
            value.length > (charLimit || 0);
        // In case a value is passed in that is greater than our limit,
        // we want to trigger a keyup/change event with a truncated value.
        if (currentInputRef && shouldAutoTrunc) {
            const newValue = value.slice(0, charLimit);
            const isTextArea = type === "textarea";
            manuallySetFieldValue(currentInputRef, newValue, isTextArea, ["keyup", "change"]);
        }
    }, [
        inputRef,
        charLimit,
        dangerouslyAutoTruncateLimitBreakingValues,
        charLimitIsMinimum,
        preventInputAtLimit,
        type,
        value,
    ]);
}
export function useChangeHandler(type, changeHandler, inputRef, shouldPreventInput) {
    return useCallback(function (evt) {
        const { current: currentInputRef } = inputRef;
        const target = evt.target;
        const preventInput = shouldPreventInput(target);
        if (type === "textarea" && currentInputRef) {
            currentInputRef.scrollTop = currentInputRef.scrollHeight;
        }
        if (preventInput) {
            return;
        }
        if (changeHandler) {
            changeHandler(evt);
        }
    }, [
        type,
        changeHandler,
        inputRef,
        shouldPreventInput,
    ]);
}
export function useKeyUpHandler(keyUpHandler, shouldPreventInput) {
    return useCallback(function (evt) {
        if (keyUpHandler) {
            if (shouldPreventInput(evt.target)) {
                return;
            }
            keyUpHandler(evt);
        }
    }, [
        keyUpHandler,
        shouldPreventInput,
    ]);
}
export function useCleanupField(inputRef, maybeTruncateValue, prevVal, type, value) {
    useEffect(function () {
        maybeTruncateValue();
        prevVal !== value && scrollToEnd(type, inputRef);
    }, [
        inputRef,
        maybeTruncateValue,
        prevVal,
        type,
        value,
    ]);
}
//# sourceMappingURL=hooks.js.map