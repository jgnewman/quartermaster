import React, { PureComponent } from "react"

import DotIcon from "../icons/DotIcon"

import {
  DynamicProps,
  RefFunction,
} from "../lib/helperTypes"

import {
  manuallyTickRadioButton,
} from "../lib/helpers"

import {
  StyledRadioButtonContainer,
  StyledRadioButtonWrapperSpan,
  StyledRadioButton,
  StyledRadioButtonOverlaySpan,
  StyledRadioButtonLabel,
} from "./styles"

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
      className,
      groupName,
      id,
      isChecked,
      isDisabled,
      label,
      radioButtonRef,
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
      className: `qm-radio-button-label ${isChecked ? "is-checked" : ""}`,
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

    const checkedClass = isChecked ? "is-checked" : ""

    return (
      <StyledRadioButtonContainer className={`qm-radio-button ${checkedClass} ${className || ""}`}>

        <StyledRadioButtonWrapperSpan className="qm-radio-button-wrapper">

          <StyledRadioButton
            ref={refFn}
            checked={isChecked}
            className="qm-radio-button-native"
            disabled={!!isDisabled}
            type="radio"
            {...boxProps}
          />

          <StyledRadioButtonOverlaySpan
            aria-hidden={true}
            className={`qm-radio-button-overlay ${checkedClass}`}
            onClick={this.handleOverlayClick.bind(this)}>
            {isChecked && <DotIcon className="qm-radio-button-dot" title="Checked" size="100%"/>}
          </StyledRadioButtonOverlaySpan>

        </StyledRadioButtonWrapperSpan>

        {label && (
          <StyledRadioButtonLabel {...labelProps}>
            {label}
          </StyledRadioButtonLabel>
        )}

      </StyledRadioButtonContainer>
    )
  }
}

export default RadioButton
