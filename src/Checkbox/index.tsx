import "./styles.styl"
import React, { PureComponent } from "react"

import CheckmarkIcon from "../icons/CheckmarkIcon"

import {
  DynamicProps,
  RefFunction,
} from "../lib/helperTypes"

import {
  buildClassNames,
  noopEvtHandler,
  manuallyTickCheckbox,
} from "../lib/helpers"

export interface CheckboxProps {
  changeHandler?: React.ChangeEventHandler
  checkboxRef?: RefFunction
  className?: string
  groupName?: string
  id?: string
  isChecked: boolean
  isDisabled?: boolean
  label?: string
  tabIndex?: number
  value?: string
}

class Checkbox extends PureComponent<CheckboxProps> {
  static displayName = "Checkbox"
  public state = { isFocused: false }
  private inputRef: HTMLInputElement | null

  handleFocus = () => this.setState({ isFocused: true })
  handleBlur = () => this.setState({ isFocused: false })

  handleOverlayClick = () => {
    const { inputRef } = this

    if (inputRef) {
      manuallyTickCheckbox(inputRef)
    }
  }

  refFn = (elem: HTMLInputElement | null) => {
    const { checkboxRef } = this.props
    this.inputRef = elem
    checkboxRef && checkboxRef(elem)
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

    const labelClasses = buildClassNames({
      isChecked,
      isDisabled,
      isEnabled,
    })

    const overlayClasses = buildClassNames({
      isChecked,
      isFocused,
    })

    return (
      <span
        className={`qmCheckboxContainer ${containerClasses} ${className || ""}`}>

        <span
          className="qmCheckboxFauxWrapper"
          onClick={isDisabled ? noopEvtHandler : this.handleOverlayClick}>

          <span className="qmCheckboxCheckWrapper">
            <span
              aria-hidden={true}
              className={`qmCheckboxOverlay ${overlayClasses}`}>
              {isChecked && <CheckmarkIcon className="qmCheckboxCheckmark" />}
            </span>
          </span>

          {label && (
            <label
              className={`qmCheckboxLabel ${labelClasses}`}
              {...labelProps}>
              {label}
            </label>
          )}

        </span>

        <input
          ref={this.refFn}
          checked={isChecked}
          className="qmCheckboxNative"
          disabled={!!isDisabled}
          type="checkbox"
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          {...boxProps}
        />

      </span>
    )
  }
}

export default Checkbox
