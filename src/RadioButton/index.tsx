import React, { PureComponent } from "react"

import {
  DynamicProps,
  RefFunction,
} from "../lib/helperTypes"

import {
  manuallyTickRadioButton,
} from "../lib/helpers"

import {
  StyledRadioButtonWrapperSpan,
  StyledRadioButton,
  StyledRadioButtonOverlaySpan,
  StyledRadioButtonLabel,
} from "./styles"

export interface RadioButtonProps {
  changeHandler?: React.ChangeEventHandler
  radioButtonRef?: RefFunction
  checked: boolean
  className?: string
  disabled?: boolean
  groupName?: string
  id?: string
  label?: string
  tabIndex?: number
  value?: string
}

class RadioButton extends PureComponent<RadioButtonProps> {
  public displayName = "RadioButton"
  private inputRef: HTMLInputElement | null

  handleOverlayClick() {
    const { inputRef } = this

    if (inputRef) {
      manuallyTickRadioButton(inputRef)
    }
  }

  render() {
    const {
      changeHandler,
      radioButtonRef,
      checked,
      className,
      disabled,
      groupName,
      id,
      label,
      tabIndex,
      value,
    } = this.props

    const refFn = (elem: HTMLInputElement | null) => {
      this.inputRef = elem
      if (radioButtonRef) {
        radioButtonRef(elem)
      }
    }

    const labelProps: DynamicProps = {
      className: "qm-radio-button-label",
    }

    if (id) {
      labelProps.htmlFor = id
    }

    const boxProps: DynamicProps = {}

    if (id) {
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

    const checkedClass = checked ? "is-checked" : ""

    return (
      <div className={`qm-radio-button ${checkedClass} ${className || ""}`}>

        <StyledRadioButtonWrapperSpan className="qm-radio-button-wrapper">

          <StyledRadioButton
            ref={refFn}
            checked={checked}
            className="qm-radio-button-native"
            disabled={!!disabled}
            type="radio"
            {...boxProps}
          />

          <StyledRadioButtonOverlaySpan
            checked={!!checked}
            className={`qm-radio-button-overlay ${checkedClass}`}
            onClick={this.handleOverlayClick.bind(this)}
          />

        </StyledRadioButtonWrapperSpan>

        {label && (
          <StyledRadioButtonLabel {...labelProps}>
            {label}
          </StyledRadioButtonLabel>
        )}

      </div>
    )
  }
}

export default RadioButton
