import {
  Dispatch,
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
} from "react"

import {
  RefArray,
} from "../lib/hooks"

import type {
  SelectProps,
} from "./types"

export type ValueSelector = (newValue: string | null) => void

export function useValueSelector(
  isOpen: boolean,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  changeHandler: SelectProps['changeHandler'],
): ValueSelector {

  return useCallback(function (newValue: string | null) {
    isOpen && setIsOpen(false)
    changeHandler && changeHandler(newValue)
  }, [
    changeHandler,
    isOpen,
    setIsOpen,
  ])
}

export function useCloseSelectOnClickAway(
  wrapperRef: RefObject<HTMLDivElement>,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
) {

  const closeOnClickAway = useCallback(function (evt: any) {
    const { current: currentWrapperRef } = wrapperRef
    if (currentWrapperRef && !evt.path.includes(currentWrapperRef)) {
      setIsOpen(false)
    }
  }, [
    wrapperRef,
    setIsOpen,
  ])

  useEffect(function () {
    document.addEventListener("click", closeOnClickAway)
    return function () {
      document.removeEventListener("click", closeOnClickAway)
    }
  }, [closeOnClickAway])

}

export function useSelectedOption(
  value: string | null,
  currentOptions: RefArray<HTMLSpanElement>,
) {

  return useCallback(function (): HTMLSpanElement | null {
    let selectedOption = currentOptions[0]

    currentOptions.some(option => {
      if (option.getAttribute("data-value") === value) {
        selectedOption = option
        return true
      }
      return false
    })

    return selectedOption || null
  }, [
    value,
    currentOptions,
  ])
}

export function useSelectedOptionFocuser(
  value: string | null,
  currentOptions: RefArray<HTMLSpanElement>,
) {

  const getSelectedOption = useSelectedOption(value, currentOptions)
  return useCallback(function () {
    getSelectedOption()?.focus()
  }, [getSelectedOption])
}

export function useKeyDownHandler(
  value: string | null,
  currentOptions: RefArray<HTMLSpanElement>,
) {

  const focusSelectedOption = useSelectedOptionFocuser(value, currentOptions)
  return useCallback(function (evt: KeyboardEvent) {
    const { key } = evt
    if (key === " " || key === "ArrowDown") {
      focusSelectedOption()
    }
  }, [focusSelectedOption])
}

export function useClickOptionHandler(selectValue: ValueSelector) {
  return useCallback(function (evt: MouseEvent) {
    const target = evt.target as HTMLElement
    const newValue = target.getAttribute("data-value") as string
    selectValue(newValue)
  }, [selectValue])
}

export type SiblingOptionFocuser = (focusedElem: HTMLSpanElement, direction: "prev" | "next") => void

export function useSiblingOptionFocuser(
  currentOptions: RefArray<HTMLSpanElement>,
): SiblingOptionFocuser {

  return useCallback(function (focusedElem: HTMLSpanElement, direction: "prev" | "next") {
    const focusIndex = currentOptions.indexOf(focusedElem)

    let elemToFocus: HTMLSpanElement
    if (direction === "prev") {
      elemToFocus = focusIndex < 1 ? currentOptions[currentOptions.length - 1] : currentOptions[focusIndex - 1]
    } else {
      elemToFocus = (focusIndex >= currentOptions.length - 1) ? currentOptions[0] : currentOptions[focusIndex + 1]
    }

    elemToFocus.focus()
  }, [currentOptions])
}

export function useOptionKeyDownHandler(
  focusSiblingOption: SiblingOptionFocuser,
  selectValue: ValueSelector,
) {

  return useCallback(function (evt: KeyboardEvent) {
    const { key } = evt
    const target = evt.target as HTMLSpanElement

    switch (key) {

      case "ArrowUp":
        return focusSiblingOption(target, "prev")

      case "ArrowDown":
        return focusSiblingOption(target, "next")

      case " ":
      case "Enter":
        return selectValue(target.getAttribute("data-value"))
    }
  }, [
    focusSiblingOption,
    selectValue,
  ])
}

export function useFocusHandler(
  setIsFocused: Dispatch<SetStateAction<boolean>>,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
) {
  return useCallback(function () {
    setIsFocused(true)
    setIsOpen(true)
  }, [
    setIsFocused,
    setIsOpen,
  ])
}

export function useBlurHandler(setIsFocused: Dispatch<SetStateAction<boolean>>) {
  return useCallback(function () {
    setIsFocused(false)
  }, [setIsFocused])
}

export function useClearButtonHandler(isDisabled: boolean, selectValue: ValueSelector) {
  return useCallback(function () {
    !isDisabled && selectValue(null)
  }, [isDisabled, selectValue])
}

export function useClearButtonFocuser() {
  return useCallback(function (evt: FocusEvent) {
    evt.stopPropagation()
  }, [])
}

