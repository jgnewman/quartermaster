import { useCallback, useEffect, } from "react";
export function useValueSelector(isOpen, setIsOpen, changeHandler) {
    return useCallback(function (newValue) {
        isOpen && setIsOpen(false);
        changeHandler && changeHandler(newValue);
    }, [
        changeHandler,
        isOpen,
        setIsOpen,
    ]);
}
export function useCloseSelectOnClickAway(wrapperRef, setIsOpen) {
    const closeOnClickAway = useCallback(function (evt) {
        const { current: currentWrapperRef } = wrapperRef;
        if (currentWrapperRef && !evt.path.includes(currentWrapperRef)) {
            setIsOpen(false);
        }
    }, [
        wrapperRef,
        setIsOpen,
    ]);
    useEffect(function () {
        document.addEventListener("click", closeOnClickAway);
        return function () {
            document.removeEventListener("click", closeOnClickAway);
        };
    }, [closeOnClickAway]);
}
export function useSelectedOption(value, currentOptions) {
    return useCallback(function () {
        let selectedOption = currentOptions[0];
        currentOptions.some(option => {
            if (option.getAttribute("data-value") === value) {
                selectedOption = option;
                return true;
            }
            return false;
        });
        return selectedOption || null;
    }, [
        value,
        currentOptions,
    ]);
}
export function useSelectedOptionFocuser(value, currentOptions) {
    const getSelectedOption = useSelectedOption(value, currentOptions);
    return useCallback(function () {
        var _a;
        (_a = getSelectedOption()) === null || _a === void 0 ? void 0 : _a.focus();
    }, [getSelectedOption]);
}
export function useKeyDownHandler(value, currentOptions) {
    const focusSelectedOption = useSelectedOptionFocuser(value, currentOptions);
    return useCallback(function (evt) {
        const { key } = evt;
        if (key === " " || key === "ArrowDown") {
            focusSelectedOption();
        }
    }, [focusSelectedOption]);
}
export function useClickOptionHandler(selectValue) {
    return useCallback(function (evt) {
        const target = evt.target;
        const newValue = target.getAttribute("data-value");
        selectValue(newValue);
    }, [selectValue]);
}
export function useSiblingOptionFocuser(currentOptions) {
    return useCallback(function (focusedElem, direction) {
        const focusIndex = currentOptions.indexOf(focusedElem);
        let elemToFocus;
        if (direction === "prev") {
            elemToFocus = focusIndex < 1 ? currentOptions[currentOptions.length - 1] : currentOptions[focusIndex - 1];
        }
        else {
            elemToFocus = (focusIndex >= currentOptions.length - 1) ? currentOptions[0] : currentOptions[focusIndex + 1];
        }
        elemToFocus.focus();
    }, [currentOptions]);
}
export function useOptionKeyDownHandler(focusSiblingOption, selectValue) {
    return useCallback(function (evt) {
        const { key } = evt;
        const target = evt.target;
        switch (key) {
            case "ArrowUp":
                return focusSiblingOption(target, "prev");
            case "ArrowDown":
                return focusSiblingOption(target, "next");
            case " ":
            case "Enter":
                return selectValue(target.getAttribute("data-value"));
        }
    }, [
        focusSiblingOption,
        selectValue,
    ]);
}
export function useFocusHandler(isDisabled, setIsFocused, setIsOpen) {
    return useCallback(function () {
        if (!isDisabled) {
            setIsFocused(true);
            setIsOpen(true);
        }
    }, [
        isDisabled,
        setIsFocused,
        setIsOpen,
    ]);
}
export function useBlurHandler(setIsFocused) {
    return useCallback(function () {
        setIsFocused(false);
    }, [setIsFocused]);
}
export function useClearButtonHandler(isDisabled, selectValue) {
    return useCallback(function () {
        !isDisabled && selectValue(null);
    }, [isDisabled, selectValue]);
}
export function useClearButtonFocuser() {
    return useCallback(function (evt) {
        evt.stopPropagation();
    }, []);
}
//# sourceMappingURL=hooks.js.map