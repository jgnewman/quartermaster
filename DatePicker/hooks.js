import { useCallback, useEffect, useMemo, useState, } from "react";
import { decrementMonth, getCalendarDataForMonth, incrementMonth, isSameDay, } from "./helpers";
export function useDateStamp(value) {
    return useMemo(function () {
        if (!value) {
            return null;
        }
        if (typeof value === "number") {
            return value;
        }
        if (value instanceof Date) {
            return value.getTime();
        }
        return (new Date(value)).getTime();
    }, [value]);
}
export function useFieldValue(stamp, showTimes) {
    return useMemo(function () {
        if (!stamp) {
            return "";
        }
        const formatOptions = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        if (showTimes) {
            formatOptions.hour = "numeric";
            formatOptions.minute = "2-digit";
        }
        return new Intl.DateTimeFormat("default", formatOptions).format(new Date(stamp));
    }, [stamp, showTimes]);
}
export function useCalendarTitle(stamp) {
    return useMemo(function () {
        if (!stamp) {
            return "";
        }
        return new Intl.DateTimeFormat("default", {
            year: "numeric",
            month: "long",
        }).format(new Date(stamp));
    }, [stamp]);
}
export function useValueResetter(changeHandler) {
    return useCallback(() => {
        changeHandler && changeHandler({ target: { value: null } });
    }, [changeHandler]);
}
export function useValueSelector(changeHandler, dateStamp, disablePast, isSelected, showTimes, timesIncrement) {
    return useCallback(() => {
        if (changeHandler) {
            const fauxEvent = {
                target: {
                    value: null,
                },
            };
            if (isSelected) {
                changeHandler(fauxEvent);
            }
            else {
                // Let's say it's noon, we are showing times, and we have the past disabled.
                // We click on today, but have not yet selected a time.
                // By default, we will have selected midnight today, which
                // ought to be disabled. So if the past is disabled, and the
                // day we selected is today, we need to select the first
                // time increment in the future.
                const now = Date.now();
                let value;
                if (disablePast && showTimes && isSameDay(dateStamp, now) && dateStamp < now) {
                    let date = (new Date(dateStamp)).setMinutes(0);
                    while (date < now) {
                        date = date + (1000 * 60 * timesIncrement);
                    }
                    value = date;
                }
                else {
                    value = dateStamp;
                }
                fauxEvent.target.value = value;
                changeHandler(fauxEvent);
            }
        }
    }, [
        changeHandler,
        dateStamp,
        disablePast,
        isSelected,
        showTimes,
        timesIncrement,
    ]);
}
export function useMonthDecrementor(currentView, setCurrentView) {
    return useCallback(function () {
        setCurrentView(decrementMonth(currentView));
    }, [currentView, setCurrentView]);
}
export function useMonthIncrementor(currentView, setCurrentView) {
    return useCallback(function () {
        setCurrentView(incrementMonth(currentView));
    }, [currentView, setCurrentView]);
}
export function useMonthResetter(setCurrentView) {
    return useCallback(function () {
        setCurrentView(Date.now());
    }, [setCurrentView]);
}
export function useCalendarData(currentView, disablePast) {
    return useMemo(function () {
        return getCalendarDataForMonth(currentView, disablePast);
    }, [currentView, disablePast]);
}
export function useCalendarState(initialState) {
    const [isOpen, setIsOpen] = useState(initialState);
    return {
        isOpen,
        closeCalendar: useCallback(() => setIsOpen(false), [setIsOpen]),
        openCalendar: useCallback(() => setIsOpen(true), [setIsOpen]),
    };
}
export function useCloseCalendarOnClickAway(calendarRef, closeCalendar, isOpen) {
    const closeOnClickAway = useCallback(function (evt) {
        const { current: currentCalendarElem } = calendarRef;
        const refExists = !!currentCalendarElem;
        const refInPath = refExists && evt.path.includes(currentCalendarElem);
        if (refInPath) {
            return;
        }
        if (isOpen) {
            closeCalendar();
        }
    }, [
        calendarRef,
        closeCalendar,
        isOpen,
    ]);
    useEffect(function () {
        document.addEventListener("click", closeOnClickAway);
        return function () {
            document.removeEventListener("click", closeOnClickAway);
        };
    }, [closeOnClickAway]);
}
export function useFieldFocuser(ref) {
    return useCallback(function () {
        if (ref.current) {
            ref.current.focus();
        }
    }, [ref]);
}
export function useScrollToSelectedTime(enabledButtonIndexRef, firstEnabledButtonRef, scrollAreaRef, totalHours) {
    useEffect(() => {
        const { current: scrollArea } = scrollAreaRef;
        const { current: firstEnabledButton } = firstEnabledButtonRef;
        const { current: enabledButtonIndex } = enabledButtonIndexRef;
        if (scrollArea && firstEnabledButton) {
            const segments = scrollArea.scrollHeight / totalHours;
            const scrollPos = segments * (enabledButtonIndex || 0);
            scrollArea.scrollTop = scrollPos;
        }
    }, [
        enabledButtonIndexRef,
        firstEnabledButtonRef,
        scrollAreaRef,
        totalHours,
    ]);
}
//# sourceMappingURL=hooks.js.map