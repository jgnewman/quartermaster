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
  manuallyTickCheckbox,
} from "../lib/helpers"

export interface ToggleProps {
  changeHandler?: React.ChangeEventHandler
  checkboxRef?: RefFunction
  className?: string
  id?: string
  isChecked: boolean
  isDisabled?: boolean
  label?: string
  tabIndex?: number
  value?: string
}

class Toggle extends PureComponent<ToggleProps> {
  static displayName = "Toggle"
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

    const sliderAndCheckmarkClasses = buildClassNames({
      isChecked,
    })

    return (
      <span
        className={`qmToggleContainer ${containerClasses} ${className || ""}`}>

        <span
          className="qmToggleFauxWrapper"
          onClick={isDisabled ? noopEvtHandler : this.handleOverlayClick}>

          <span className="qmToggleCheckWrapper">
            <span
              aria-hidden={true}
              className={`qmToggleOverlay ${overlayClasses}`}>
              <Icon
                className={`qmToggleCheckmark ${sliderAndCheckmarkClasses}`}
                type="checkmark"
                size={10}
              />
              <span className={`qmToggleSlider ${sliderAndCheckmarkClasses}`}></span>
            </span>
          </span>

          {label && (
            <label
              className={`qmToggleLabel ${labelClasses}`}
              {...labelProps}>
              {label}
            </label>
          )}

        </span>

        <input
          ref={this.refFn}
          checked={isChecked}
          className="qmToggleNative"
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

export default Toggle