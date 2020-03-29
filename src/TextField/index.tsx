import React, {
  PureComponent,
  ReactNode,
  ReactNodeArray,
} from "react"

import {
  StyledInputWrapperDiv,
  StyledInput,
  StyledTextArea,
  StyledTextAreaLabel,
  StyledTextAreaErr,
} from "./styles"

import {
  DynamicProps,
  InputElem,
  NullableInputElem,
  RefFunction,
} from "../lib/helperTypes"

import { manuallySetFieldValue } from "../lib/helpers"
import CharLimitCounter from "../CharLimitCounter"

export interface TextFieldProps {
  changeHandler?: React.ChangeEventHandler
  charLimit?: number
  charLimitIsMinimum?: boolean
  children?: ReactNode | ReactNodeArray
  className?: string
  dangerouslyAutoTruncateLimitBreakingValues?: boolean // almost never necessary
  defaultValue?: string
  disabled?: boolean
  enableTextAreaResize?: boolean
  errorText?: string
  fieldRef?: RefFunction // function like (elem => this.myRef = elem)
  hideCharLimitProgress?: boolean
  hideCharLimitText?: boolean
  id?: string
  ignoreLastPass?: boolean
  keyUpHandler?: React.KeyboardEventHandler
  label?: string
  placeholder?: string
  preventInputAtLimit?: boolean
  tabIndex?: number
  type?: string
  value?: string
}

class TextField extends PureComponent<TextFieldProps> {
  public displayName = "TextField"
  private inputRef: NullableInputElem

  shouldPreventInput(evtTarget: InputElem) {
    const {
      charLimit,
      charLimitIsMinimum,
      preventInputAtLimit,
      value="",
    } = this.props

    const newValue = evtTarget.value

    return typeof charLimit !== "undefined"
      && !charLimitIsMinimum
      && preventInputAtLimit
      && value.length >= charLimit
      && newValue.length > value.length
  }

  handleChange(evt: React.ChangeEvent) {
    const { changeHandler, type } = this.props

    const target = evt.target as InputElem
    const shouldPreventInput = this.shouldPreventInput(target)

    if (type === "textarea" && this.inputRef) {
      this.inputRef.scrollTop = this.inputRef.scrollHeight
    }

    if (shouldPreventInput) {
      return
    }

    if (changeHandler) {
      changeHandler(evt)
    }
  }

  handleKeyUp(evt: React.KeyboardEvent) {
    const { keyUpHandler } = this.props

    if (keyUpHandler) {
      if (this.shouldPreventInput(evt.target as InputElem)) {
        return
      }

      keyUpHandler(evt)
    }
  }

  maybeTruncateValue() {
    const {
      charLimit = 0,
      dangerouslyAutoTruncateLimitBreakingValues = false,
      charLimitIsMinimum = false,
      preventInputAtLimit = false,
      type,
      value = "",
    } = this.props

    const { inputRef } = this
    const shouldAutoTrunc = charLimit &&
                            !charLimitIsMinimum &&
                            preventInputAtLimit &&
                            dangerouslyAutoTruncateLimitBreakingValues &&
                            value.length > charLimit

    // In case a value is passed in that is greater than our limit,
    // we want to trigger a keyup/change event with a truncated value.
    if (inputRef && shouldAutoTrunc) {
      const newValue = value.slice(0, charLimit)
      const isTextArea = type === "textarea"
      manuallySetFieldValue(inputRef, newValue, isTextArea, ["keyup", "change"])
    }
  }

  scrollToBottom() {
    const { inputRef } = this
    const { type } = this.props

    if (inputRef && type === "textarea") {
      inputRef.scrollTop = inputRef.scrollHeight
    }
  }

  componentDidUpdate(prevProps: TextFieldProps) {
    const { value } = this.props

    this.maybeTruncateValue()
    prevProps.value !== value && this.scrollToBottom()
  }

  componentDidMount() {
    this.maybeTruncateValue()
  }

  render() {
    const {
      charLimit,
      children,
      className,
      defaultValue,
      disabled,
      enableTextAreaResize,
      errorText,
      fieldRef,
      hideCharLimitProgress,
      hideCharLimitText,
      id,
      ignoreLastPass,
      label,
      charLimitIsMinimum,
      placeholder,
      tabIndex,
      type,
      value,
    } = this.props

    const isTextArea = type === "textarea"
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

    const refFn = (elem: NullableInputElem) => {
      this.inputRef = elem
      if (fieldRef) {
        fieldRef(elem)
      }
    }

    const classNames = ["qm-text-field", isTextArea ? "is-text-area" : "is-field"]

    if (charLimit) {
      classNames.push("has-char-limit")
    }

    if (disabled) {
      classNames.push("is-disabled")
    }

    const labelProps: DynamicProps = {
      className: "qm-text-field-label",
    }

    if (id) {
      labelProps.htmlFor = id
    }

    return (
      <div className={`${classNames.join(" ")} ${className || ""}`}>

        {label && (
          <StyledTextAreaLabel {...labelProps}>
            {label}
          </StyledTextAreaLabel>
        )}

        <StyledInputWrapperDiv
          className={`qm-text-field-input-wrapper`}
          isTextArea={isTextArea}>

          {isTextArea && (
            <StyledTextArea
              charLimit={charLimit}
              className="qm-text-field-input textarea"
              disabled={disabled || false}
              enableTextAreaResize={!!enableTextAreaResize}
              hideCharLimitText={hideCharLimitText}
              onChange={this.handleChange.bind(this)}
              onKeyUp={this.handleKeyUp.bind(this)}
              placeholder={placeholder || ""}
              ref={refFn}
              {...dynamicProps}
            />
          )}

          {!isTextArea && (
            <StyledInput
              charLimit={charLimit}
              className="qm-text-field-input field"
              disabled={disabled || false}
              hideCharLimitText={hideCharLimitText}
              onChange={this.handleChange.bind(this)}
              onKeyUp={this.handleKeyUp.bind(this)}
              placeholder={placeholder || ""}
              ref={refFn}
              type={type || "text"}
              {...dynamicProps}
            />
          )}

          {charLimit && (
            <CharLimitCounter
              className="qm-text-field-limit-counter"
              count={typeof value === "string" ? value.length : 0}
              hideProgressBar={!!hideCharLimitProgress}
              hideText={!!hideCharLimitText}
              limit={charLimit}
              limitIsMinimum={!!charLimitIsMinimum}
            />
          )}
        </StyledInputWrapperDiv>

        {errorText && (
          <StyledTextAreaErr className="qm-text-field-error-msg">{errorText}</StyledTextAreaErr>
        )}

        {children}
      </div>
    )
  }
}

export default TextField
