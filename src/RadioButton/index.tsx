import "./styles.styl"
import React, { PureComponent } from "react"

import Icon from "../Icon"

import {
  DynamicProps,
  RefFunction,
} from "../lib/helperTypes"

import {
  buildClassNames,
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
    const isEnabled = !isDisabled

    const labelProps: DynamicProps = {}
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

    const containerClasses = buildClassNames({
      isChecked,
      isDisabled,
      isEnabled,
    })

    const overlayClasses = buildClassNames({
      isChecked,
      isFocused,
    })

    const labelClasses = buildClassNames({
      isChecked,
      isDisabled,
      isEnabled,
    })

    return (
      <span
        className={`qmRadioContainer ${containerClasses} ${className || ""}`}>

        <span
          className="qmRadioFauxWrapper"
          onClick={isDisabled ? noopEvtHandler : this.handleOverlayClick}>

          <span className="qmRadioCheckWrapper">
            <span
              aria-hidden={true}
              className={`qmRadioOverlay ${overlayClasses}`}>
              {isChecked && (
                <Icon
                  type="dot"
                  title="checked"
                  size="xxs"
                  className="qmRadioDotIcon"
                />
              )}
            </span>
          </span>

          {label && (
            <label
              className={`qmRadioLabel ${labelClasses}`}
              {...labelProps}>
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
