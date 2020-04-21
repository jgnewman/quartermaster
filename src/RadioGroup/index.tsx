import React, { PureComponent } from "react"

import { RefFunction, DynamicProps } from "../lib/helperTypes"
import RadioButton from "../RadioButton"

export interface RadioOption {
  elemRef?: RefFunction
  id?: string
  label: string
  tabIndex?: number
  value: string
}

export interface RadioGroupProps {
  changeHandler?: React.ChangeEventHandler
  className?: string
  isDisabled?: boolean
  name: string
  options: RadioOption[]
  value: string
}

class RadioGroup extends PureComponent<RadioGroupProps> {
  static displayName = "RadioGroup"

  buildRadio(key: string, { label, value, id, elemRef, tabIndex }: RadioOption) {
    const { name, isDisabled, changeHandler } = this.props
    const groupValue = this.props.value

    const dynamicProps: DynamicProps = {}

    if (id) {
      dynamicProps.id = id
    }

    if (elemRef) {
      dynamicProps.elemRef = elemRef
    }

    if (tabIndex) {
      dynamicProps.tabIndex = tabIndex
    }

    if (changeHandler) {
      dynamicProps.changeHandler = changeHandler
    }

    return <RadioButton
      key={key}
      groupName={name}
      isChecked={groupValue === value}
      isDisabled={!!isDisabled}
      label={label}
      value={value}
      {...dynamicProps}
    />
  }

  render() {
    const { className, options } = this.props

    return (
      <div className={`qmRadioGroupContainer ${className || ""}`}>
        {options.map(option => this.buildRadio(option.value, option))}
      </div>
    )
  }
}

export default RadioGroup
