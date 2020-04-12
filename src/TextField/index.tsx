import "./styles.styl"
import React, { PureComponent } from "react"

import {
  DynamicProps,
  InputElem,
  NullableInputElem,
  RefFunction,
} from "../lib/helperTypes"

import {
  manuallySetFieldValue,
  buildClassNames,
} from "../lib/helpers"

import Label from "../Label"
import CharLimitCounter from "./CharLimitCounter"

export interface TextFieldProps {
  changeHandler?: React.ChangeEventHandler
  charLimit?: number
  charLimitIsMinimum?: boolean
  className?: string
  dangerouslyAutoTruncateLimitBreakingValues?: boolean // almost never necessary
  defaultValue?: string
  enableTextAreaResize?: boolean
  errorText?: string
  fieldRef?: RefFunction // function like (elem => this.myRef = elem)
  hasError?: boolean
  hideCharLimitProgress?: boolean
  hideCharLimitText?: boolean
  id?: string
  ignoreLastPass?: boolean
  isCompact?: boolean
  isDisabled?: boolean
  isRequired?: boolean
  keyUpHandler?: React.KeyboardEventHandler
  label?: string
  placeholder?: string
  preventInputAtLimit?: boolean
  tabIndex?: number
  type?: string
  value?: string
}

class TextField extends PureComponent<TextFieldProps> {
  static displayName = "TextField"
  public state = { isFocused: false }
  private inputRef: NullableInputElem

  handleFocus = () => this.setState({ isFocused: true })
  handleBlur = () => this.setState({ isFocused: false })

  handleChange = (evt: React.ChangeEvent) => {
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

  handleKeyUp = (evt: React.KeyboardEvent) => {
    const { keyUpHandler } = this.props

    if (keyUpHandler) {
      if (this.shouldPreventInput(evt.target as InputElem)) {
        return
      }

      keyUpHandler(evt)
    }
  }

  refFn = (elem: NullableInputElem) => {
    const { fieldRef } = this.props
    this.inputRef = elem
    fieldRef && fieldRef(elem)
  }

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

    if (inputRef) {
      if (type === "textarea") {
        inputRef.scrollTop = inputRef.scrollHeight
      } else {
        inputRef.scrollLeft = inputRef.scrollWidth
      }
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
      charLimitIsMinimum,
      children,
      className,
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
      label,
      placeholder,
      tabIndex,
      type,
      value,
    } = this.props

    const { isFocused } = this.state
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
              onChange={this.handleChange}
              onKeyUp={this.handleKeyUp}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              placeholder={placeholder || ""}
              ref={this.refFn}
              {...dynamicProps}>
            </textarea>
          )}

          {!isTextArea && (
            <input
              className={`qmTextFieldInput ${inputClasses}`}
              disabled={!!isDisabled}
              onChange={this.handleChange}
              onKeyUp={this.handleKeyUp}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              placeholder={placeholder || ""}
              ref={this.refFn}
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
  }
}

export default TextField
