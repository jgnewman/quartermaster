import { useEffect, useCallback, useMemo, useRef, useState, } from "react";
import { createId, disableScrolling, enableScrolling, manuallyTickCheckbox, manuallyTickRadioButton, } from "./helpers";
export function usePrevious(value) {
    const ref = useRef(null);
    useEffect(() => { ref.current = value; });
    return ref.current;
}
export function useRefArray(value = []) {
    const ref = useRef(value);
    const shouldReset = useRef(false);
    const toAdd = [];
    useEffect(() => {
        if (toAdd.length) {
            ref.current.push(...toAdd);
            toAdd.length = 0;
        }
        if (shouldReset.current) {
            toAdd.length = 0;
            ref.current = [];
            shouldReset.current = false;
        }
    });
    return [
        ref.current,
        (item) => { toAdd.push(item); },
        () => { shouldReset.current = true; },
    ];
}
export function useMergedRefs(refA, refB) {
    return useMemo(function () {
        return function (value) {
            [refA, refB].forEach(ref => {
                if (ref) {
                    ref.current = value;
                }
            });
        };
    }, [refA, refB]);
}
export function useFocusHandlers(focusHandler, blurHandler) {
    const [isFocused, setIsFocused] = useState(false);
    return {
        isFocused,
        handleFocus: useCallback(function (evt) {
            setIsFocused(true);
            focusHandler && focusHandler(evt);
        }, [setIsFocused, focusHandler]),
        handleBlur: useCallback(function (evt) {
            setIsFocused(false);
            blurHandler && blurHandler(evt);
        }, [setIsFocused, blurHandler]),
    };
}
export function useInputChecker(inputRef) {
    return useCallback(function () {
        const { current: currentInput } = inputRef;
        switch (currentInput === null || currentInput === void 0 ? void 0 : currentInput.type) {
            case "radio": return manuallyTickRadioButton(currentInput);
            case "checkbox": return manuallyTickCheckbox(currentInput);
        }
    }, [inputRef]);
}
export function useScrollHandling(shouldBeDisabled) {
    useEffect(function () {
        const handler = shouldBeDisabled ? disableScrolling : enableScrolling;
        handler();
        return handler;
    }, [shouldBeDisabled]);
}
export function useId() {
    return useMemo(function () {
        return createId();
    }, []);
}
//# sourceMappingURL=hooks.js.map