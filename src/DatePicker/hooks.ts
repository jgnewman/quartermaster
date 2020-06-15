import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react"

import {
  elemInEventPath,
} from "../lib/helpers"

import {
  useSyncRef,
} from "../hooks"

import type {
  DatePickerChangeHandler,
  DateRange,
  ValidValue,
  ValidValueRange,
} from "./types"

import {
  getCalendarData,
  isSameDay,
  updatedDateFromValue,
} from "./helpers"

export function useDateRangeFromValue(
  enableRange: boolean | undefined,
  value: ValidValue | ValidValueRange,
): DateRange {

  const valueRef = useRef<[Date | null, Date | null]>([null, null])
  const currentArray = valueRef.current

  if (enableRange) {
    if (!Array.isArray(value)) {
      throw new Error("Ranged date pickers take a 2-item array as their value.")
    }

    currentArray.forEach((curItem, index) => {
      const newNum = value[index]
      currentArray[index] = updatedDateFromValue(curItem, newNum)
    })

  } else {
    if (Array.isArray(value)) {
      throw new Error("Non-ranged date pickers take a number as their value.")
    }

    const [curItem] = currentArray
    currentArray[0] = updatedDateFromValue(curItem, value)
    currentArray[1] = null
  }

  const [x, y] = currentArray
  const onlyHasEndDate = y && !x
  const datesAreBackward = x && y && x > y

  if (onlyHasEndDate || datesAreBackward) {
    currentArray.reverse()
  }

  return currentArray
}

export function useClickPicker(
  confirmRef: RefObject<HTMLButtonElement>,
  setOpen: Dispatch<SetStateAction<boolean>>,
) {
  return useCallback(function (evt) {
    const { current: currentConfirmBtn } = confirmRef

    if (elemInEventPath(currentConfirmBtn, evt.nativeEvent)) {
      return
    }

    setOpen(true)
  }, [confirmRef, setOpen])
}

export function useFocusInput(
  setOpen: Dispatch<SetStateAction<boolean>>,
) {
  return useCallback(function () {
    setOpen(true)
  }, [setOpen])
}

export function useCloseOnClickAway(
  contentRef: RefObject<HTMLDivElement>,
  isOpen: boolean,
  selectorsRef: RefObject<HTMLDivElement>,
  setOpen: Dispatch<SetStateAction<boolean>>,
) {
  const wrappedIsOpen = useSyncRef(isOpen)

  const closeOnClickAway = useCallback(function (evt: any) {
    const { current: currentlyOpen } = wrappedIsOpen
    const { current: currentContentElem } = contentRef
    const { current: currentSelectorsElem } = selectorsRef

    if (elemInEventPath(currentSelectorsElem, evt) || elemInEventPath(currentContentElem, evt)) {
      return
    }

    if (currentlyOpen) {
      setOpen(false)
    }

  }, [
    contentRef,
    selectorsRef,
    setOpen,
    wrappedIsOpen,
  ])

  useEffect(function () {
    document.addEventListener("click", closeOnClickAway)
    return function () {
      document.removeEventListener("click", closeOnClickAway)
    }
  }, [closeOnClickAway])
}

export function useClearValue(
  changeHandler: DatePickerChangeHandler | undefined,
  enableRange: boolean | undefined,
) {
  return useCallback(function () {
    changeHandler && changeHandler(enableRange ? [null, null] : null)
  }, [changeHandler, enableRange])
}

export function useConfirmValue(setOpen: Dispatch<SetStateAction<boolean>>) {
  return useCallback(function () {
    setOpen(false)
  }, [setOpen])
}

export function useFieldValue(
  enableRange: boolean | undefined,
  enableTimes: boolean | undefined,
  endDate: Date | null,
  startDate: Date | null,
) {
  return useMemo(function () {
    if (!startDate) {
      return ""
    }

    const formatOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    }

    if (enableTimes) {
      formatOptions.hour = "numeric"
      formatOptions.minute = "2-digit"
    }

    const startDateFormat = new Intl.DateTimeFormat("default", formatOptions).format(startDate)

    if (enableRange) {
      if (!endDate) {
        return startDateFormat
      } else {
        const endDateFormat = new Intl.DateTimeFormat("default", formatOptions).format(endDate)
        return `${startDateFormat} — ${endDateFormat}`
      }

    } else {
      return startDateFormat
    }

  }, [
    enableRange,
    enableTimes,
    endDate,
    startDate,
  ])
}

export function useCalendarData(
  disablePast = false,
  referenceMonth: number,
  referenceYear: number,
  weekStartsOnMonday = false,
) {
  return useMemo(function () {
    return getCalendarData(
      disablePast,
      referenceMonth,
      referenceYear,
      weekStartsOnMonday,
    )
  }, [
    disablePast,
    referenceMonth,
    referenceYear,
    weekStartsOnMonday,
  ])
}

export function useDayTitle(date: Date) {
  return useMemo(function () {

    const formatOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    }

    return new Intl.DateTimeFormat("default", formatOptions).format(date)

  }, [date])
}

export function useMemoizedSameDay(a: Date | null, b: Date | null) {
  return useMemo(function () {
    return isSameDay(a, b)
  }, [a, b])
}

export function useValueSetter(
  changeHandler: DatePickerChangeHandler | undefined,
  date: Date,
  enableRange: boolean | undefined,
  endDate: Date | null,
  isEndDate: boolean | undefined,
  isSelected: boolean | undefined,
  isStartDate: boolean | undefined,
  startDate: Date | null,
) {
  return useCallback(function () {

    if (enableRange) {
      const shouldUpdateStart = isStartDate || !startDate || date < startDate
      const shouldUpdateEnd = isEndDate || !shouldUpdateStart

      const newStart = shouldUpdateStart
                     ? (isSelected ? null : date.getTime())
                     : (startDate ? startDate.getTime() : null)

      const newEnd = shouldUpdateEnd
                   ? (isSelected ? null : date.getTime())
                   : (endDate ? endDate.getTime() : null)

      const out: ValidValueRange = [newStart, newEnd]
      changeHandler && changeHandler(out)

    } else {
      changeHandler && changeHandler(isSelected ? null : date.getTime())
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
  ])
}

export function useRefreshView(
  now: Date,
  setCurrentView: Dispatch<SetStateAction<Date>>,
) {
  return useCallback(function () {
    setCurrentView(now)
  }, [now, setCurrentView])
}

export function useDecrementMonth(
  currentView: Date,
  setCurrentView: Dispatch<SetStateAction<Date>>,
) {
  return useCallback(function () {
    const newDate = new Date(currentView)
    newDate.setMonth(newDate.getMonth() - 1)
    setCurrentView(newDate)
  }, [currentView, setCurrentView])
}

export function useIncrementMonth(
  currentView: Date,
  setCurrentView: Dispatch<SetStateAction<Date>>,
) {
  return useCallback(function () {
    const newDate = new Date(currentView)
    newDate.setMonth(newDate.getMonth() + 1)
    setCurrentView(newDate)
  }, [currentView, setCurrentView])
}

export function useCalendarMonthName(currentView: Date) {
  return useMemo(function () {
    return new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "long",
    }).format(currentView)
  }, [currentView])
}
