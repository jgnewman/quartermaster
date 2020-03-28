import React, {
  Component,
  ReactNode,
  ReactNodeArray,
} from "react"

import CharLimitCounter from "../CharLimitCounter"

export interface TextFieldProps {
  changeHandler?: React.ChangeEventHandler
  charLimit?: number
  children?: ReactNode | ReactNodeArray
  className?: string
  defaultValue?: string
  disabled?: boolean
  errorText?: string
  fieldRef?: (elem: HTMLElement | null) => void // function like (elem => this.myRef = elem)
  id?: string
  ignoreLastPass?: boolean
  keyUpHandler?: React.KeyboardEventHandler
  label?: string
  limitIsMinimum?: boolean
  placeholder?: string
  preventInputAtLimit?: boolean
  tabIndex?: number
  type?: string
  value?: string
}

interface TextFieldState {
  valueLength: number
}

interface DynamicProps {
  [key: string]: unknown
}

class TextField extends Component<TextFieldProps, TextFieldState> {
  public displayName = "TextField"
  public state: TextFieldState = { valueLength: 0 }
  private inputRef: HTMLElement | null

  shouldPreventInput(evtTarget: HTMLInputElement) {
    const {
      charLimit,
      limitIsMinimum,
      preventInputAtLimit,
      value="",
    } = this.props

    const newValue = evtTarget.value

    return typeof charLimit !== "undefined"
      && !limitIsMinimum
      && preventInputAtLimit
      && value.length >= charLimit
      && newValue.length > value.length
  }

  handleChange(evt: React.ChangeEvent) {
    const { changeHandler, type } = this.props

    const target = evt.target as HTMLInputElement
    const shouldPreventInput = this.shouldPreventInput(target)

    if (type === "textarea" && this.inputRef) {
      this.inputRef.scrollTop = this.inputRef.scrollHeight
    }

    if (shouldPreventInput) {
      return
    }

    this.setState({
      valueLength: target.value.length,
    })

    if (changeHandler) {
      changeHandler(evt)
    }
  }

  handleKeyUp(evt: React.KeyboardEvent) {
    const { keyUpHandler } = this.props

    if (keyUpHandler) {
      if (this.shouldPreventInput(evt.target as HTMLInputElement)) {
        return
      }

      keyUpHandler(evt)
    }
  }

  render() {
    const {
      charLimit,
      children,
      className,
      defaultValue,
      disabled,
      errorText,
      fieldRef,
      id,
      ignoreLastPass,
      label,
      limitIsMinimum,
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

    if (charLimit) {
      const defaultFieldPadding = isTextArea ? 12 : 16
      const charLimitTextSize = isTextArea ? 24 : charLimit.toString().length
      const paddingPerChar = isTextArea ? 1 : 22

      if (isTextArea) {
        dynamicProps.style = {
          paddingBottom: `${(charLimitTextSize * paddingPerChar) + defaultFieldPadding}px`,
        }
      } else {
        dynamicProps.style = {
          paddingRight: `${(charLimitTextSize * paddingPerChar) + (defaultFieldPadding * 2)}px`,
        }
      }
    }

    const refFn = (elem: HTMLElement | null) => {
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

    return (
      <div className={`${classNames.join(" ")} ${className || ""}`}>

        {label && (
          <label className="qm-text-field-label">{ label }</label>
        )}

        <div className={`qm-text-field-input-wrapper`}>
          {isTextArea && (
            <textarea
              ref={refFn}
              className="qm-text-field-input textarea"
              placeholder={placeholder || ""}
              disabled={disabled || false}
              onChange={this.handleChange.bind(this)}
              onKeyUp={this.handleKeyUp.bind(this)}
              {...dynamicProps}
            />
          )}

          {!isTextArea && (
            <input
              ref={refFn}
              className="qm-text-field-input field"
              type={type || "text"}
              placeholder={placeholder || ""}
              disabled={disabled || false}
              onChange={this.handleChange.bind(this)}
              onKeyUp={this.handleKeyUp.bind(this)}
              {...dynamicProps}
            />
          )}
        </div>

        {charLimit && (
          <CharLimitCounter
            limit={charLimit}
            limitIsMinimum={!!limitIsMinimum}
            count={this.state.valueLength}
          />
        )}

        {errorText && (
          <span className="qm-text-field-error-msg">{errorText}</span>
        )}

        {children}
      </div>
    )
  }
}

export default TextField
