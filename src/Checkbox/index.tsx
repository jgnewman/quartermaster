import React, { PureComponent } from "react"

import CheckmarkIcon from "../icons/CheckmarkIcon"

import {
  DynamicProps,
  RefFunction,
} from "../lib/helperTypes"

import {
  manuallyTickCheckbox,
} from "../lib/helpers"

import {
  StyledCheckboxWrapperSpan,
  StyledCheckbox,
  StyledCheckboxOverlaySpan,
  StyledCheckboxLabel,
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
  public displayName = "Checkbox"
  private inputRef: HTMLInputElement | null

  handleOverlayClick() {
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

    return (
      <div className={`qm-checkbox ${checkedClass} ${className || ""}`}>

        <StyledCheckboxWrapperSpan className="qm-checkbox-wrapper">

          <StyledCheckbox
            ref={refFn}
            checked={isChecked}
            className="qm-checkbox-native"
            disabled={!!isDisabled}
            type="checkbox"
            {...boxProps}
          />

          <StyledCheckboxOverlaySpan
            aria-hidden={true}
            className={`qm-checkbox-overlay ${checkedClass}`}
            onClick={this.handleOverlayClick.bind(this)}>
            {isChecked && <CheckmarkIcon className="qm-checkbox-checkmark" />}
          </StyledCheckboxOverlaySpan>

        </StyledCheckboxWrapperSpan>

        {label && (
          <StyledCheckboxLabel {...labelProps}>
            {label}
          </StyledCheckboxLabel>
        )}

      </div>
    )
  }
}

export default Checkbox
