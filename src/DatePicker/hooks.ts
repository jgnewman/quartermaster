import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"

import type {
  FauxChangeEventHandler,
  FauxChangeEvent,
} from "../lib/helperTypes"

import {
  elemInEventPath,
} from "../lib/helpers"

import {
  Day,
  decrementMonth,
  getCalendarDataForMonth,
  incrementMonth,
  isSameDay,
} from "./helpers"

export function useDateFromProp(value?: Date | number | string | null): Date | null {
  return useMemo(function () {
    if (!value) {
      return null
    }

    if (value instanceof Date) {
      return value
    }

    return new Date(value)

  }, [value])
}

export function useFieldValue(date: Date | null, showTimes?: boolean): string {
  return useMemo(function () {
    if (!date) {
      return ""
    }

    const formatOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    }

    if (showTimes) {
      formatOptions.hour = "numeric"
      formatOptions.minute = "2-digit"
    }

    return new Intl.DateTimeFormat("default", formatOptions).format(date)

  }, [date, showTimes])
}

export function useCalendarTitle(date: Date | null): string {
  return useMemo(function () {
    if (!date) {
      return ""
    }

    return new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "long",
    }).format(date)

  }, [date])
}

export function useValueResetter(changeHandler: FauxChangeEventHandler | undefined) {
  return useCallback(() => {
    changeHandler && changeHandler({ target: { value: null } })
  }, [changeHandler])
}

export function useValueSelector(
  changeHandler: FauxChangeEventHandler | undefined,
  date: Date,
  disablePast: boolean,
  isSelected: boolean,
  showTimes: boolean,
  timesIncrement: number,
) {
  return useCallback(() => {
    if (changeHandler) {
      const fauxEvent: FauxChangeEvent = {
        target: {
          value: null,
        },
      }

      if (isSelected) {
        changeHandler(fauxEvent)
      } else {

        // Let's say it's noon, we are showing times, and we have the past disabled.
        // We click on today, but have not yet selected a time.
        // By default, we will have selected midnight today, which
        // ought to be disabled. So if the past is disabled, and the
        // day we selected is today, we need to select the first
        // time increment in the future.

        const now = new Date()
        let value: number

        if (disablePast && showTimes && isSameDay(date, now) && date < now) {
          let future = (new Date(date)).setMinutes(0)
          const nowTime = now.getTime()

          while (future < nowTime) {
            future = future + (1000 * 60 * timesIncrement)
          }

          value = future

        } else {
          value = date.getTime()
        }

        fauxEvent.target.value = value
        changeHandler(fauxEvent)
      }
    }
  }, [
    changeHandler,
    date,
    disablePast,
    isSelected,
    showTimes,
    timesIncrement,
  ])
}

export function useMonthDecrementor(
  currentView: Date,
  setCurrentView: Dispatch<SetStateAction<Date>>,
) {
  return useCallback(function () {
    setCurrentView(decrementMonth(currentView))
  }, [currentView, setCurrentView])
}

export function useMonthIncrementor(
  currentView: Date,
  setCurrentView: Dispatch<SetStateAction<Date>>,
) {
  return useCallback(function () {
    setCurrentView(incrementMonth(currentView))
  }, [currentView, setCurrentView])
}

export function useMonthResetter(setCurrentView: Dispatch<SetStateAction<Date>>) {
  return useCallback(function () {
    setCurrentView(new Date())
  }, [setCurrentView])
}

export function useCalendarData(currentView: Date, disablePast: boolean): Day[][] {
  return useMemo(function () {
    return getCalendarDataForMonth(currentView, disablePast)
  }, [currentView, disablePast])
}

export function useCalendarState(initialState: boolean) {
  const [isOpen, setIsOpen] = useState(initialState)
  return {
    isOpen,
    closeCalendar: useCallback(() => setIsOpen(false), [setIsOpen]),
    openCalendar: useCallback(() => setIsOpen(true), [setIsOpen]),
  }
}

export function useCloseCalendarOnClickAway(
  calendarRef: RefObject<HTMLDivElement>,
  clearRef: RefObject<HTMLButtonElement>,
  closeCalendar: () => void,
  isOpen: boolean,
) {
  const closeOnClickAway = useCallback(function (evt: any) {
    const { current: currentCalendarElem } = calendarRef
    const { current: currentClearElem } = clearRef

    if (elemInEventPath(currentCalendarElem, evt) || elemInEventPath(currentClearElem, evt)) {
      return
    }


    if (isOpen) {
      closeCalendar()
    }

  }, [
    calendarRef,
    clearRef,
    closeCalendar,
    isOpen,
  ])

  useEffect(function () {
    document.addEventListener("click", closeOnClickAway)
    return function () {
      document.removeEventListener("click", closeOnClickAway)
    }
  }, [closeOnClickAway])
}

export function useFieldFocuser(ref: RefObject<HTMLInputElement>) {
  return useCallback(function () {
    if (ref.current) {
      ref.current.focus()
    }
  }, [ref])
}

export function useScrollToSelectedTime(
  enabledButtonIndexRef: RefObject<number>,
  firstEnabledButtonRef: RefObject<HTMLButtonElement>,
  scrollAreaRef: RefObject<HTMLDivElement>,
  totalHours: number,
) {
  useEffect(() => {
    const { current: scrollArea } = scrollAreaRef
    const { current: firstEnabledButton } = firstEnabledButtonRef
    const { current: enabledButtonIndex } = enabledButtonIndexRef

    if (scrollArea && firstEnabledButton) {
      const segments = scrollArea.scrollHeight / totalHours
      const scrollPos = segments * (enabledButtonIndex || 0)
      scrollArea.scrollTop = scrollPos + 2
    }
  }, [
    enabledButtonIndexRef,
    firstEnabledButtonRef,
    scrollAreaRef,
    totalHours,
  ])
}
