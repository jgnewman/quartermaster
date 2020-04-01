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

import {
  DivRadioButtonContainer,
  SpanRadioButtonWrapper,
  RadioButtonNative,
  SpanRadioButtonOverlay,
  LabelForRadioButton,
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
    const disabledClass = isDisabled ? "is-disabled": ""

    return (
      <DivRadioButtonContainer
        className={`qm-radio-button ${checkedClass} ${disabledClass} ${className || ""}`}
        onClick={isDisabled ? noopEvtHandler : this.handleOverlayClick.bind(this)}>

        <SpanRadioButtonWrapper className="qm-radio-button-wrapper">

          <RadioButtonNative
            ref={refFn}
            checked={isChecked}
            className="qm-radio-button-native"
            disabled={!!isDisabled}
            type="radio"
            {...boxProps}
          />

          <SpanRadioButtonOverlay
            aria-hidden={true}
            className={`qm-radio-button-overlay ${checkedClass}`}>
            {isChecked && <DotIcon className="qm-radio-button-dot" title="Checked" size="100%"/>}
          </SpanRadioButtonOverlay>

        </SpanRadioButtonWrapper>

        {label && (
          <LabelForRadioButton
            isDisabled={!!isDisabled}
            {...labelProps}>
            {label}
          </LabelForRadioButton>
        )}

      </DivRadioButtonContainer>
    )
  }
}

export default RadioButton
