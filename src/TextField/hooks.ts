import {
  ChangeEvent,
  ChangeEventHandler,
  KeyboardEvent,
  KeyboardEventHandler,
  RefObject,
  useCallback,
  useEffect,
} from "react"

import type {
  InputElem,
} from "../lib/helperTypes"

import {
  manuallySetFieldValue,
} from "../lib/helpers"

function scrollToEnd(type = "", inputRef: RefObject<HTMLInputElement | HTMLTextAreaElement>) {
  const { current: currentInputRef } = inputRef
  if (currentInputRef) {
    if (type === "textarea") {
      currentInputRef.scrollTop = currentInputRef.scrollHeight
    } else {
      currentInputRef.scrollLeft = currentInputRef.scrollWidth
    }
  }
}

export function usePreventInputDecision(
  charLimit: number | undefined,
  charLimitIsMinimum: boolean,
  preventInputAtLimit: boolean,
  value = "",
) {

  return useCallback(function (evtTarget: InputElem) {
    const newValue = evtTarget.value

    return typeof charLimit !== "undefined"
      && !charLimitIsMinimum
      && preventInputAtLimit
      && value.length >= charLimit
      && newValue.length > value.length

  }, [
    charLimit,
    charLimitIsMinimum,
    preventInputAtLimit,
    value,
  ])
}

export function useTruncateValueDecision(
  inputRef: RefObject<HTMLInputElement | HTMLTextAreaElement>,
  charLimit: number | undefined,
  dangerouslyAutoTruncateLimitBreakingValues: boolean,
  charLimitIsMinimum: boolean,
  preventInputAtLimit: boolean,
  type: string | undefined,
  value = "",
) {

  return useCallback(function () {

    const { current: currentInputRef } = inputRef

    const shouldAutoTrunc = charLimit &&
                            !charLimitIsMinimum &&
                            preventInputAtLimit &&
                            dangerouslyAutoTruncateLimitBreakingValues &&
                            value.length > (charLimit || 0)

    // In case a value is passed in that is greater than our limit,
    // we want to trigger a keyup/change event with a truncated value.
    if (currentInputRef && shouldAutoTrunc) {
      const newValue = value.slice(0, charLimit)
      const isTextArea = type === "textarea"
      manuallySetFieldValue(currentInputRef, newValue, isTextArea, ["keyup", "change"])
    }

  }, [
    inputRef,
    charLimit,
    dangerouslyAutoTruncateLimitBreakingValues,
    charLimitIsMinimum,
    preventInputAtLimit,
    type,
    value,
  ])
}

export function useChangeHandler(
  type: string | undefined,
  changeHandler: ChangeEventHandler | undefined,
  inputRef: RefObject<HTMLInputElement | HTMLTextAreaElement>,
  shouldPreventInput: ReturnType<typeof usePreventInputDecision>,
) {

  return useCallback(function (evt: ChangeEvent) {
    const { current: currentInputRef } = inputRef
    const target = evt.target as InputElem
    const preventInput = shouldPreventInput(target)

    if (type === "textarea" && currentInputRef) {
      currentInputRef.scrollTop = currentInputRef.scrollHeight
    }

    if (preventInput) {
      return
    }

    if (changeHandler) {
      changeHandler(evt)
    }
  }, [
    type,
    changeHandler,
    inputRef,
    shouldPreventInput,
  ])

}

export function useKeyUpHandler(
  keyUpHandler: KeyboardEventHandler | undefined,
  shouldPreventInput: ReturnType<typeof usePreventInputDecision>,
) {

  return useCallback(function (evt: KeyboardEvent) {
    if (keyUpHandler) {
      if (shouldPreventInput(evt.target as InputElem)) {
        return
      }

      keyUpHandler(evt)
    }

  }, [
    keyUpHandler,
    shouldPreventInput,
  ])
}

export function useCleanupField(
  inputRef: RefObject<HTMLInputElement | HTMLTextAreaElement>,
  maybeTruncateValue: ReturnType<typeof useTruncateValueDecision>,
  prevVal: string | undefined,
  type: string | undefined,
  value: string | undefined,
) {

  useEffect(function () {
    maybeTruncateValue()
    prevVal !== value && scrollToEnd(type, inputRef)

  }, [
    inputRef,
    maybeTruncateValue,
    prevVal,
    type,
    value,
  ])

}
