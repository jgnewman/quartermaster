import React, { PureComponent } from "react"

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
  checked: boolean
  className?: string
  disabled?: boolean
  groupName?: string
  id?: string
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
      if (checkboxRef) {
        checkboxRef(elem)
      }
    }

    const labelProps: DynamicProps = {
      className: "qm-checkbox-label",
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
      <div className={`qm-checkbox ${checkedClass} ${className || ""}`}>

        <StyledCheckboxWrapperSpan className="qm-checkbox-wrapper">

          <StyledCheckbox
            ref={refFn}
            checked={checked}
            className="qm-checkbox-native"
            disabled={!!disabled}
            type="checkbox"
            {...boxProps}
          />

          <StyledCheckboxOverlaySpan
            checked={!!checked}
            className={`qm-checkbox-overlay ${checkedClass}`}
            onClick={this.handleOverlayClick.bind(this)}
          />

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
