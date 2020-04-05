import "./styles.styl"
import React, { PureComponent } from "react"

import DotIcon from "../icons/DotIcon"

import {
  DynamicProps,
  RefFunction,
} from "../lib/helperTypes"

import {
  noopEvtHandler,
  manuallyTickRadioButton,
} from "../lib/helpers"

export interface RadioButtonProps {
  changeHandler?: React.ChangeEventHandler
  className?: string
  groupName?: string
  id?: string
  isChecked: boolean
  isDisabled?: boolean
  label?: string
  radioButtonRef?: RefFunction
  tabIndex?: number
  value?: string
}

class RadioButton extends PureComponent<RadioButtonProps> {
  static displayName = "RadioButton"
  public state = { isFocused: false }
  private inputRef: HTMLInputElement | null

  handleFocus = () => this.setState({ isFocused: true })
  handleBlur = () => this.setState({ isFocused: false })

  handleOverlayClick = () => {
    const { inputRef } = this

    if (inputRef) {
      manuallyTickRadioButton(inputRef)
    }
  }

  refFn = (elem: HTMLInputElement | null) => {
    const { radioButtonRef } = this.props
    this.inputRef = elem
    radioButtonRef && radioButtonRef(elem)
  }

  render() {
    const {
      changeHandler,
      className,
      groupName,
      id,
      isChecked,
      isDisabled,
      label,
      tabIndex,
      value,
    } = this.props

    const { isFocused } = this.state
    const checkedClass = isChecked ? "isChecked" : ""
    const abledClass = isDisabled ? "isDisabled" : "isEnabled"
    const focusedClass = isFocused ? "isFocused": ""

    const labelProps: DynamicProps = {
      className: `qmRadioLabel ${checkedClass} ${abledClass}`,
    }

    const boxProps: DynamicProps = {}

    if (id) {
      labelProps.htmlFor = id
      boxProps.id = id
    }

    if (tabIndex) {
      boxProps.tabIndex = tabIndex
    }

    if (groupName) {
      boxProps.name = groupName
    }

    if (changeHandler) {
      boxProps.onChange = changeHandler
    }

    if (value) {
      boxProps.value = value
    }

    return (
      <span
        className={`qmRadioContainer ${checkedClass} ${abledClass} ${className || ""}`}>

        <span
          className="qmRadioFauxWrapper"
          onClick={isDisabled ? noopEvtHandler : this.handleOverlayClick}>

          <span className="qmRadioCheckWrapper">
            <span
              aria-hidden={true}
              className={`qmRadioOverlay ${checkedClass} ${focusedClass}`}>
              {isChecked && <DotIcon className="qmRadioDot" title="Checked" size="100%"/>}
            </span>
          </span>

          {label && (
            <label {...labelProps}>
              {label}
            </label>
          )}

        </span>

        <input
          ref={this.refFn}
          checked={isChecked}
          className="qmRadioNative"
          disabled={!!isDisabled}
          type="radio"
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          {...boxProps}
        />

      </span>
    )
  }
}

export default RadioButton
