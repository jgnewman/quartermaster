import "./styles.styl"

import React, {
  ChangeEventHandler,
  KeyboardEventHandler,
  MutableRefObject,
  ReactNode,
  forwardRef,
  memo,
  useRef,
} from "react"

import type {
  DynamicProps,
} from "../lib/helperTypes"

import {
  buildClassNames,
} from "../lib/helpers"

import {
  useFocusHandlers,
  useMergedRefs,
  usePrevious,
} from "../lib/hooks"

import Label from "../Label"
import CharLimitCounter from "./CharLimitCounter"

import {
  usePreventInputDecision,
  useTruncateValueDecision,
  useChangeHandler,
  useKeyUpHandler,
  useCleanupField,
} from "./hooks"

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
