import { useCallback, useEffect, useRef, useMemo, } from "react";
import { createId, elemInEventPath, } from "../lib/helpers";
import { useSyncRef, } from "../hooks";
import { getCalendarData, getTimeMapFromDate, isEarlierDayThan, isSameDay, setDateToNextIncrement, updatedDateFromValue, } from "./helpers";
const MONTH_FORMAT_OPTIONS = {
    year: "numeric",
    month: "long",
};
const DAY_FORMAT_OPTIONS = Object.assign(Object.assign({}, MONTH_FORMAT_OPTIONS), { day: "numeric" });
const TIME_FORMAT_OPTIONS = {
    hour: "numeric",
    minute: "2-digit",
};
const DAY_TIME_FORMAT_OPTIONS = Object.assign(Object.assign({}, DAY_FORMAT_OPTIONS), TIME_FORMAT_OPTIONS);
const MonthFormatter = new Intl.DateTimeFormat("default", MONTH_FORMAT_OPTIONS);
const DayFormatter = new Intl.DateTimeFormat("default", DAY_FORMAT_OPTIONS);
const DayTimeFormatter = new Intl.DateTimeFormat("default", DAY_TIME_FORMAT_OPTIONS);
const TimeFormatter = new Intl.DateTimeFormat("default", TIME_FORMAT_OPTIONS);
export function useInvalidDateError(disablePast, endDate, now, startDate) {
    return useMemo(function () {
        if (!disablePast) {
            return;
        }
        if (isEarlierDayThan(startDate, now) || isEarlierDayThan(endDate, now)) {
            throw new Error("DatePicker does not accept a date in the past as a value when `disablePast` is true.");
        }
    }, [
        disablePast,
        endDate,
        now,
        startDate,
    ]);
}
export function useDateRangeFromValue(disablePast, enableRange, enableTimes, now, timeIncrement, value) {
    const valueRef = useRef([null, null]);
    const currentArray = valueRef.current;
    if (enableRange) {
        if (!Array.isArray(value)) {
            throw new Error("Ranged date pickers take a 2-item array as their value.");
        }
        currentArray.forEach((curItem, index) => {
            const newNum = value[index];
            currentArray[index] = updatedDateFromValue(curItem, newNum);
        });
    }
    else {
        if (Array.isArray(value)) {
            throw new Error("Non-ranged date pickers take a number as their value.");
        }
        const [curItem] = currentArray;
        currentArray[0] = updatedDateFromValue(curItem, value);
        currentArray[1] = null;
    }
    const [x, y] = currentArray;
    const onlyHasEndDate = y && !x;
    const datesAreBackward = x && y && x > y;
    if (onlyHasEndDate || datesAreBackward) {
        currentArray.reverse();
    }
    if (enableTimes) {
        currentArray[0] && setDateToNextIncrement(currentArray[0], timeIncrement);
        currentArray[1] && setDateToNextIncrement(currentArray[1], timeIncrement);
    }
    const [startDate, endDate] = currentArray;
    useInvalidDateError(disablePast, endDate, now, startDate);
    return currentArray;
}
export function useClickPicker(confirmRef, isDisabled, setOpen) {
    return useCallback(function (evt) {
        if (isDisabled) {
            return;
        }
        const { current: currentConfirmBtn } = confirmRef;
        if (elemInEventPath(currentConfirmBtn, evt.nativeEvent)) {
            return;
        }
        setOpen(true);
    }, [confirmRef, isDisabled, setOpen]);
}
export function useFocusInput(setOpen) {
    return useCallback(function () {
        setOpen(true);
    }, [setOpen]);
}
export function useCloseOnClickAway(contentRef, isOpen, selectorsRef, setOpen) {
    const wrappedIsOpen = useSyncRef(isOpen);
    const closeOnClickAway = useCallback(function (evt) {
        const { current: currentlyOpen } = wrappedIsOpen;
        const { current: currentContentElem } = contentRef;
        const { current: currentSelectorsElem } = selectorsRef;
        if (elemInEventPath(currentSelectorsElem, evt) || elemInEventPath(currentContentElem, evt)) {
            return;
        }
        if (currentlyOpen) {
            setOpen(false);
        }
    }, [
        contentRef,
        selectorsRef,
        setOpen,
        wrappedIsOpen,
    ]);
    useEffect(function () {
        document.addEventListener("click", closeOnClickAway);
        return function () {
            document.removeEventListener("click", closeOnClickAway);
        };
    }, [closeOnClickAway]);
}
export function useClearValue(changeHandler, enableRange) {
    return useCallback(function () {
        changeHandler && changeHandler(enableRange ? [null, null] : null);
    }, [changeHandler, enableRange]);
}
export function useConfirmValue(setOpen) {
    return useCallback(function () {
        setOpen(false);
    }, [setOpen]);
}
export function useFieldValue(enableRange, enableTimes, endDate, startDate) {
    return useMemo(function () {
        if (!startDate) {
            return "";
        }
        const formatter = enableTimes ? DayTimeFormatter : DayFormatter;
        const startDateFormat = formatter.format(startDate);
        return (!enableRange || !endDate) ? startDateFormat : `${startDateFormat} – ${formatter.format(endDate)}`;
    }, [
        enableRange,
        enableTimes,
        endDate,
        startDate,
    ]);
}
export function useCalendarData(disablePast = false, referenceMonth, referenceYear, weekStartsOnMonday = false) {
    return useMemo(function () {
        return getCalendarData(disablePast, referenceMonth, referenceYear, weekStartsOnMonday);
    }, [
        disablePast,
        referenceMonth,
        referenceYear,
        weekStartsOnMonday,
    ]);
}
export function useDayTitle(date) {
    return useMemo(function () {
        return DayFormatter.format(date);
    }, [date]);
}
export function useMemoizedSameDay(a, b) {
    return useMemo(function () {
        return isSameDay(a, b);
    }, [a, b]);
}
export function useValueSetter(changeHandler, date, enableRange, endDate, isEndDate, isSelected, isStartDate, startDate) {
    return useCallback(function () {
        if (enableRange) {
            const shouldUpdateStart = isStartDate || !startDate || date < startDate;
            const shouldUpdateEnd = isEndDate || !shouldUpdateStart;
            const newStart = shouldUpdateStart
                ? (isSelected ? null : date.getTime())
                : (startDate ? startDate.getTime() : null);
            const newEnd = shouldUpdateEnd
                ? (isSelected ? null : date.getTime())
                : (endDate ? endDate.getTime() : null);
            const out = [newStart, newEnd];
            changeHandler && changeHandler(out);
        }
        else {
            changeHandler && changeHandler(isSelected ? null : date.getTime());
        }
    }, [
        changeHandler,
        date,
        enableRange,
        endDate,
        isEndDate,
        isSelected,
        isStartDate,
        startDate,
    ]);
}
export function useRefreshView(now, setCurrentView) {
    return useCallback(function () {
        setCurrentView(now);
    }, [now, setCurrentView]);
}
export function useDecrementMonth(currentView, setCurrentView) {
    return useCallback(function () {
        const newDate = new Date(currentView);
        newDate.setMonth(newDate.getMonth() - 1);
        setCurrentView(newDate);
    }, [currentView, setCurrentView]);
}
export function useIncrementMonth(currentView, setCurrentView) {
    return useCallback(function () {
        const newDate = new Date(currentView);
        newDate.setMonth(newDate.getMonth() + 1);
        setCurrentView(newDate);
    }, [currentView, setCurrentView]);
}
export function useCalendarMonthName(currentView) {
    return useMemo(function () {
        return MonthFormatter.format(currentView);
    }, [currentView]);
}
export function useEnableLeftButton(currentView, disablePast, now) {
    return useMemo(function () {
        if (!disablePast) {
            return true;
        }
        const nowYear = now.getFullYear();
        const viewYear = currentView.getFullYear();
        if (viewYear < nowYear) {
            return false;
        }
        if (viewYear > nowYear) {
            return true;
        }
        const nowMonth = now.getMonth();
        const viewMonth = currentView.getMonth();
        return viewMonth > nowMonth;
    }, [
        currentView,
        disablePast,
        now,
    ]);
}
export function useSliderIds(enableRange) {
    return useMemo(function () {
        return [createId(), enableRange ? createId() : ""];
    }, [enableRange]);
}
export function useSliderLabels(enableRange, endDate, startDate) {
    return useMemo(function () {
        return [
            startDate ? DayFormatter.format(startDate) : "Select start date...",
            (enableRange && endDate) ? DayFormatter.format(endDate) : "Select end date...",
        ];
    }, [
        enableRange,
        endDate,
        startDate,
    ]);
}
export function useTimeMappings(disablePast, enableRange, endDate, now, startDate, timeIncrement) {
    return useMemo(function () {
        const startDateMap = !startDate ? {} : getTimeMapFromDate(startDate, disablePast, false, // isEndDate
        now, timeIncrement);
        const endDateMap = (!enableRange || !endDate) ? {} : getTimeMapFromDate(endDate, disablePast, true, // isEndDate
        now, timeIncrement);
        return [startDateMap, endDateMap];
    }, [
        disablePast,
        enableRange,
        endDate,
        now,
        startDate,
        timeIncrement,
    ]);
}
export function useSliderValues(date, timesMap) {
    return useMemo(function () {
        const time = date ? date.getTime() : null;
        const mapKeys = Object.keys(timesMap);
        const min = 0;
        const max = mapKeys.length - 1;
        let value = 0;
        mapKeys.some(key => {
            const timeValue = timesMap[key].timeValue;
            if (timeValue === time) {
                value = timesMap[key].slideValue;
                return true;
            }
            return false;
        });
        return [value, min, max];
    }, [date, timesMap]);
}
export function useValueFormatter(timeMap) {
    return useCallback(function (slideValue) {
        var _a;
        const timeValue = (_a = timeMap[slideValue]) === null || _a === void 0 ? void 0 : _a.timeValue;
        if (!timeValue) {
            return "";
        }
        return TimeFormatter.format(timeValue);
    }, [timeMap]);
}
export function useStartTimeSetter(changeHandler, enableRange, endDate, startDate, startTimesMap) {
    return useCallback(function (evt) {
        var _a;
        const slideValue = evt.target.value;
        const startTime = ((_a = startTimesMap[slideValue]) === null || _a === void 0 ? void 0 : _a.timeValue) || (startDate ? startDate.getTime() : null);
        const endTime = enableRange ? (endDate ? endDate.getTime() : null) : null;
        changeHandler && changeHandler(enableRange ? [startTime, endTime] : startTime);
    }, [
        changeHandler,
        enableRange,
        endDate,
        startDate,
        startTimesMap,
    ]);
}
export function useEndTimeSetter(changeHandler, endDate, endTimesMap, startDate) {
    return useCallback(function (evt) {
        var _a;
        const slideValue = evt.target.value;
        const startTime = startDate ? startDate.getTime() : null;
        const endTime = ((_a = endTimesMap[slideValue]) === null || _a === void 0 ? void 0 : _a.timeValue) || (endDate ? endDate.getTime() : null);
        changeHandler && changeHandler([startTime, endTime]);
    }, [
        changeHandler,
        endDate,
        endTimesMap,
        startDate,
    ]);
}
export function useCloseOnBlurContainer(containerRef, isOpen, setOpen) {
    const focusWatcher = useCallback(function () {
        const { current: currentContainer } = containerRef;
        if (!isOpen || !currentContainer) {
            return;
        }
        if (!currentContainer.contains(document.activeElement)) {
            setOpen(false);
        }
    }, [containerRef, isOpen, setOpen]);
    return useEffect(function () {
        document.addEventListener('focusin', focusWatcher);
        return function () {
            document.removeEventListener('focusin', focusWatcher);
        };
    }, [focusWatcher]);
}
//# sourceMappingURL=hooks.js.map