import React, {
  ChangeEventHandler,
  MutableRefObject,
  forwardRef,
  memo,
} from "react"

import RadioButton, { RadioButtonProps } from "../RadioButton"

export interface RadioOptionSettingsObject {
  ref?: MutableRefObject<HTMLInputElement>
  id?: string
  label: string
  tabIndex?: number
  value: string
}

interface RadioOptionProps extends RadioOptionSettingsObject {
  groupValue: string
  changeHandler?: ChangeEventHandler
  isDisabled?: boolean
  name: string
}

const RadioOption = memo(forwardRef(function ({
  changeHandler,
  groupValue,
  id,
  isDisabled,
  label,
  name,
  tabIndex,
  value,
}: RadioOptionProps, ref: MutableRefObject<HTMLInputElement>) {

  const dynamicProps: Partial<RadioButtonProps> = {}

  if (id) {
    dynamicProps.id = id
  }

  if (tabIndex) {
    dynamicProps.tabIndex = tabIndex
  }

  if (changeHandler) {
    dynamicProps.changeHandler = changeHandler
  }

  return <RadioButton
    ref={ref}
    groupName={name}
    isChecked={groupValue === value}
    isDisabled={!!isDisabled}
    label={label}
    value={value}
    {...dynamicProps}
  />

}))

RadioOption.displayName = "RadioOption"

export interface RadioGroupProps {
  changeHandler?: ChangeEventHandler
  className?: string
  isDisabled?: boolean
  name: string
  options: RadioOptionSettingsObject[]
  value: string
}

function RadioGroup({
  className,
  changeHandler,
  isDisabled,
  name,
  options,
  value,
}: RadioGroupProps) {
  return (
    <div className={`qmRadioGroupContainer ${className || ""}`}>
      {options.map(option => (
        <RadioOption
          key={option.value}
          changeHandler={changeHandler}
          isDisabled={isDisabled}
          name={name}
          groupValue={value}
          { ...option }
        />
      ))}
    </div>
  )
}

RadioGroup.displayName = "RadioGroup"

export default memo(RadioGroup)
