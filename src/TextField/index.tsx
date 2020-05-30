import "./styles.styl"

import React, {
  ChangeEvent,
  ChangeEventHandler,
  KeyboardEvent,
  KeyboardEventHandler,
  MutableRefObject,
  RefObject,
  ReactNode,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useRef,
} from "react"

import {
  DynamicProps,
  InputElem,
} from "../lib/helperTypes"

import {
  manuallySetFieldValue,
  buildClassNames,
} from "../lib/helpers"

import {
  useFocusHandlers,
  useMergedRefs,
  usePrevious,
} from "../lib/hooks"

import Label from "../Label"
import CharLimitCounter from "./CharLimitCounter"

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

export interface TextFieldProps {
  changeHandler?: ChangeEventHandler
  charLimit?: number
  charLimitIsMinimum?: boolean
  children?: ReactNode
  className?: string
  dangerouslyAutoTruncateLimitBreakingValues?: boolean // almost never necessary
  defaultValue?: string
  enableTextAreaResize?: boolean
  errorText?: string
  hasError?: boolean
  hideCharLimitProgress?: boolean
  hideCharLimitText?: boolean
  id?: string
  ignoreLastPass?: boolean
  isCompact?: boolean
  isDisabled?: boolean
  isRequired?: boolean
  keyUpHandler?: KeyboardEventHandler
  label?: string
  placeholder?: string
  preventInputAtLimit?: boolean
  tabIndex?: number
  type?: string
  value?: string
}

function usePreventInputDecision(
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

function useTruncateValueDecision(
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

function useChangeHandler(
  type: string | undefined,
  changeHandler: TextFieldProps['changeHandler'],
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

function useKeyUpHandler(
  keyUpHandler: TextFieldProps['keyUpHandler'],
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

function useCleanupField(
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

const TextField = forwardRef(function ({
  changeHandler,
  charLimit,
  charLimitIsMinimum = false,
  children,
  className,
  dangerouslyAutoTruncateLimitBreakingValues = false,
  defaultValue,
  enableTextAreaResize,
  errorText,
  hasError,
  hideCharLimitProgress,
  hideCharLimitText,
  id,
  ignoreLastPass,
  isCompact,
  isDisabled,
  isRequired,
  keyUpHandler,
  label,
  placeholder,
  preventInputAtLimit = false,
  tabIndex,
  type,
  value,
}: TextFieldProps, ref: MutableRefObject<HTMLInputElement | HTMLTextAreaElement>) {

  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)
  const mergedRef = useMergedRefs(ref, inputRef)
  const prevVal = usePrevious(value)

  const {
    isFocused,
    handleFocus,
    handleBlur,
  } = useFocusHandlers()

  const shouldPreventInput = usePreventInputDecision(
    charLimit,
    charLimitIsMinimum,
    preventInputAtLimit,
    value,
  )

  const maybeTruncateValue = useTruncateValueDecision(
    inputRef,
    charLimit,
    dangerouslyAutoTruncateLimitBreakingValues,
    charLimitIsMinimum,
    preventInputAtLimit,
    type,
    value,
  )

  const handleChange = useChangeHandler(
    type,
    changeHandler,
    inputRef,
    shouldPreventInput,
  )

  const handleKeyUp = useKeyUpHandler(
    keyUpHandler,
    shouldPreventInput,
  )

  useCleanupField(
    inputRef,
    maybeTruncateValue,
    prevVal,
    type,
    value,
  )


  const isTextArea = type === "textarea"
  const isEnabled = !isDisabled
  const isField = !isTextArea
  const noResize = !enableTextAreaResize
  const hasCharLimit = !!charLimit

  const dynamicProps: DynamicProps = {}

  if (typeof id === "string") {
    dynamicProps.id = id
  }

  if (typeof tabIndex === "number") {
    dynamicProps.tabIndex = tabIndex
  }

  if (typeof value === "string") {
    dynamicProps.value = value
  }

  if (!dynamicProps.value && typeof defaultValue === "string") {
    dynamicProps.defaultValue = defaultValue
  }

  if (ignoreLastPass) {
    dynamicProps["data-lpignore"] = true
  }

  const labelProps: DynamicProps = {
    className: "qmTextFieldLabel",
    isRequired,
  }

  if (id) {
    labelProps.htmlFor = id
  }

  // We want to display a char count that looks something like "22 / 25".
  // The padding we need is calculated as twice the charlimit + 3 chars for the separator
  // all divided by 2 since the width of a character is about half an em.
  const fieldStyle: DynamicProps = {}
  if (!isTextArea && charLimit) {
    fieldStyle.paddingRight = `${(charLimit.toString().length * 2 + 3)/2}em`
  }

  const containerClasses: string = buildClassNames({
    hasCharLimit,
    hasError,
    isCompact,
    isDisabled,
    isEnabled,
    isField,
    isFocused,
    isRequired,
    isTextArea,
    noResize,
  })

  const inputWrapperClasses: string = buildClassNames({
    isDisabled,
    isEnabled,
    isField,
    isTextArea,
  })

  const inputClasses: string = buildClassNames({
    hasCharLimit,
    hasError,
    isCompact,
    isDisabled,
    isEnabled,
    isField,
    isFocused,
    isTextArea,
    noResize,
  })

  return (
    <div className={`qmTextFieldContainer ${containerClasses} ${className || ""}`}>

      {label && <Label text={label} {...labelProps} />}

      <div className={`qmTextFieldInputWrapper ${inputWrapperClasses}`}>

        {isTextArea && (
          <textarea
            className={`qmTextFieldInput ${inputClasses}`}
            disabled={!!isDisabled}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder || ""}
            ref={mergedRef}
            {...dynamicProps}>
          </textarea>
        )}

        {!isTextArea && (
          <input
            className={`qmTextFieldInput ${inputClasses}`}
            disabled={!!isDisabled}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder || ""}
            ref={mergedRef}
            type={type || "text"}
            style={fieldStyle}
            {...dynamicProps}
          />
        )}

        {charLimit && (
          <CharLimitCounter
            className={buildClassNames({ isEnabled, isDisabled })}
            count={typeof value === "string" ? value.length : 0}
            hideProgressBar={!!hideCharLimitProgress}
            hideText={!!hideCharLimitText}
            isCompact={!!isCompact}
            isTextArea={isTextArea}
            limit={charLimit}
            limitIsMinimum={!!charLimitIsMinimum}
          />
        )}
      </div>

      {hasError && errorText && (
        <span className="qmTextFieldError">{errorText}</span>
      )}

      {children}
    </div>
  )
})

TextField.displayName = "TextField"

export default memo(TextField)
