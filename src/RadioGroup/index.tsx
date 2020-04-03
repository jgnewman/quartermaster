import React, { PureComponent } from "react"

import { RefFunction, DynamicProps } from "../lib/helperTypes"
import RadioButton from "../RadioButton"

export interface RadioOption {
  label: string
  value: string
  id?: string
  ref?: RefFunction
  tabIndex?: number
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

  buildRadio(key: string, { label, value, id, ref, tabIndex }: RadioOption) {
    const { name, isDisabled, changeHandler } = this.props
    const groupValue = this.props.value

    const dynamicProps: DynamicProps = {}

    if (id) {
      dynamicProps.id = id
    }

    if (ref) {
      dynamicProps.radioButtonRef = ref
    }

    if (tabIndex) {
      dynamicProps.tabIndex = ref
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
      <div className={`qm-radio-group ${className || ""}`}>
        {options.map(option => this.buildRadio(option.value, option))}
      </div>
    )
  }
}

export default RadioGroup
