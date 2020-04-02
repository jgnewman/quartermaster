import React, { PureComponent } from "react"

import CheckmarkIcon from "../icons/CheckmarkIcon"

import {
  DynamicProps,
  RefFunction,
} from "../lib/helperTypes"

import {
  noopEvtHandler,
  manuallyTickCheckbox,
} from "../lib/helpers"

import {
  DivCheckboxContainer,
  SpanCheckboxWrapper,
  CheckboxNative,
  SpanCheckboxOverlay,
  LabelForCheckbox,
} from "./styles"

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

  render() {
    const {
      changeHandler,
      checkboxRef,
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

    const refFn = (elem: HTMLInputElement | null) => {
      this.inputRef = elem
      if (checkboxRef) {
        checkboxRef(elem)
      }
    }

    const labelProps: DynamicProps = {
      className: `qm-checkbox-label ${isChecked ? "is-checked" : ""}`,
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
    const disabledClass = isDisabled ? "is-disabled" : ""

    return (
      <>
        <DivCheckboxContainer
          className={`qm-checkbox ${checkedClass} ${disabledClass} ${className || ""}`}
          onClick={isDisabled ? noopEvtHandler : this.handleOverlayClick}>

          <SpanCheckboxWrapper className="qm-checkbox-wrapper">
            <SpanCheckboxOverlay
              isFocused={isFocused}
              aria-hidden={true}
              className={`qm-checkbox-overlay ${checkedClass}`}>
              {isChecked && <CheckmarkIcon className="qm-checkbox-checkmark" />}
            </SpanCheckboxOverlay>
          </SpanCheckboxWrapper>

          {label && (
            <LabelForCheckbox
              isDisabled={!!isDisabled}
              {...labelProps}>
              {label}
            </LabelForCheckbox>
          )}

        </DivCheckboxContainer>

        <CheckboxNative
          ref={refFn}
          checked={isChecked}
          className="qm-checkbox-native"
          disabled={!!isDisabled}
          type="checkbox"
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          {...boxProps}
        />
      </>
    )
  }
}

export default Checkbox
