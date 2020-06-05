import {
  MutableRefObject,
  RefObject,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react"

import { RefFunction } from "./helperTypes"

import {
  disableScrolling,
  enableScrolling,
  manuallyTickCheckbox,
  manuallyTickRadioButton,
} from "./helpers"

export function usePrevious<T>(value: T) {
  const ref = useRef<T>(value)
  useEffect(() => { ref.current = value })
  return ref.current
}

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

type NullableRefObject = MutableRefObject<any> | null

export function useMergedRefs(refA: NullableRefObject, refB: NullableRefObject): RefFunction {
  return useMemo(function () {
    return function (value: HTMLElement | null) {
      [refA, refB].forEach(ref => {
        if (ref) {
          ref.current = value
        }
      })
    }
  }, [refA, refB])
}

export function useFocusHandlers() {
  const [isFocused, setIsFocused] = useState(false)
  return {
    isFocused,
    handleFocus: useCallback(function () { setIsFocused(true) }, [setIsFocused]),
    handleBlur: useCallback(function () { setIsFocused(false) }, [setIsFocused]),
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