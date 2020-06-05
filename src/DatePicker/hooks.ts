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
} from "../lib/helperTypes"

import {
  decrementMonth,
  getCalendarDataForMonth,
  incrementMonth,
} from "./datePickerHelpers"

export function useDateStamp(value?: Date | number | string | null): number | null {
  return useMemo(function () {
    if (!value) {
      return null
    }

    if (typeof value === "number") {
      return value
    }

    if (value instanceof Date) {
      return value.getTime()
    }

    return (new Date(value)).getTime()
  }, [value])
}

export function useFieldValue(stamp: number | null): string {
  return useMemo(function () {
    if (!stamp) {
      return ""
    }

    return new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(stamp))

  }, [stamp])
}

export function useCalendarTitle(stamp: number | null): string {
  return useMemo(function () {
    if (!stamp) {
      return ""
    }

    return new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "long",
    }).format(new Date(stamp))

  }, [stamp])
}

export function useValueSelector(
  changeHandler: FauxChangeEventHandler | undefined,
  closeCalendar: () => void,
  closeOnChange: boolean,
  dateStamp: number,
  isSelected: boolean,
) {
  return useCallback(() => {
    changeHandler && changeHandler({ target: { value: isSelected ? null : dateStamp } })
    closeOnChange && closeCalendar()
  }, [
    changeHandler,
    closeCalendar,
    closeOnChange,
    dateStamp,
    isSelected,
  ])
}

export function useMonthDecrementor(
  currentView: number,
  setCurrentView: Dispatch<SetStateAction<number>>,
) {
  return useCallback(function () {
    setCurrentView(decrementMonth(currentView))
  }, [currentView, setCurrentView])
}

export function useMonthIncrementor(
  currentView: number,
  setCurrentView: Dispatch<SetStateAction<number>>,
) {
  return useCallback(function () {
    setCurrentView(incrementMonth(currentView))
  }, [currentView, setCurrentView])
}

export function useMonthResetter(setCurrentView: Dispatch<SetStateAction<number>>) {
  return useCallback(function () {
    setCurrentView(Date.now())
  }, [setCurrentView])
}

export function useCalendarData(currentView: number) {
  return useMemo(function () {
    return getCalendarDataForMonth(currentView)
  }, [currentView])
}

export function useCalendarState(initialState: boolean) {
  const [isOpen, setIsOpen] = useState(initialState)
  return {
    isOpen,
    closeCalendar: useCallback(() => setIsOpen(false), [setIsOpen]),
    openCalendar: useCallback(() => setIsOpen(true), [setIsOpen]),
    toggleCalendar: useCallback(() => setIsOpen(!isOpen), [isOpen, setIsOpen]),
  }
}

export function useCloseCalendarOnClickAway(
  calendarRef: RefObject<HTMLDivElement>,
  closeCalendar: () => void,
  isOpen: boolean,
) {
  const closeOnClickAway = useCallback(function (evt: any) {

    const { current: currentCalendarElem } = calendarRef
    const refExists = !!currentCalendarElem
    const refInPath = refExists && evt.path.includes(currentCalendarElem)

    if (refInPath) {
      return
    }

    if (isOpen) {
      closeCalendar()
    }

  }, [
    calendarRef,
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
