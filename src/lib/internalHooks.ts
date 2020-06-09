import {
  FocusEvent,
  FocusEventHandler,
  RefObject,
  useEffect,
  useCallback,
  useRef,
  useState,
} from "react"

import {
  disableScrolling,
  enableScrolling,
  manuallyTickCheckbox,
  manuallyTickRadioButton,
} from "./helpers"

export type RefArray<T> = T[]
export type RefArrayAdder<T> = (item: T) => void
export type RefArrayResetter = () => void

export function useRefArray<T>(value: T[] = []): [RefArray<T>, RefArrayAdder<T>, RefArrayResetter] {
  const ref = useRef<T[]>(value)
  const shouldReset = useRef<boolean>(false)
  const toAdd: T[] = []

  useEffect(() => {
    if (toAdd.length) {
      ref.current.push(...toAdd)
      toAdd.length = 0
    }

    if (shouldReset.current) {
      toAdd.length = 0
      ref.current = []
      shouldReset.current = false
    }
  })

  return [
    ref.current,
    (item: T) => { toAdd.push(item) }, // Add an item
    () => { shouldReset.current = true }, // Reset items
  ]
}

export function useFocusHandlers(
  focusHandler?: FocusEventHandler,
  blurHandler?: FocusEventHandler,
) {
  const [isFocused, setIsFocused] = useState(false)
  return {
    isFocused,

    handleFocus: useCallback(function (evt: FocusEvent) {
      setIsFocused(true)
      focusHandler && focusHandler(evt)
    }, [setIsFocused, focusHandler]),

    handleBlur: useCallback(function (evt: FocusEvent) {
      setIsFocused(false)
      blurHandler && blurHandler(evt)
    }, [setIsFocused, blurHandler]),
  }
}

export function useInputChecker(inputRef: RefObject<HTMLInputElement>) {
  return useCallback(function () {
    const { current: currentInput } = inputRef
    switch (currentInput?.type) {
      case "radio": return manuallyTickRadioButton(currentInput)
      case "checkbox": return manuallyTickCheckbox(currentInput)
    }
  }, [ inputRef ])
}

export function useScrollHandling(shouldBeDisabled: boolean) {
  useEffect(function () {
    const handler = shouldBeDisabled ? disableScrolling : enableScrolling
    handler()
    return handler
  }, [shouldBeDisabled])
}

