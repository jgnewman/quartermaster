import "./styles.styl"
import React, {
  ChangeEventHandler,
  memo,
} from "react"

import type {
  DynamicProps,
} from "../lib/helperTypes"

import Label from "../Label"
import Text from "../Text"

import {
  useFormattedValue,
} from "./hooks"

export interface SliderProps {
  changeHandler?: ChangeEventHandler
  className?: string
  formatValue?: (n: number) => string
  id?: string
  isDisabled?: boolean
  isRequired?: boolean
  label?: string
  max: number
  min: number
  tabIndex?: number
  value: number
}

function Slider({
  changeHandler,
  className,
  formatValue,
  id,
  isDisabled,
  isRequired,
  label,
  max,
  min,
  tabIndex,
  value,
}: SliderProps) {

  const formattedValue = useFormattedValue(
    formatValue,
    value,
  )

  const labelProps: DynamicProps = {
    className: "qmSliderLabel",
    isRequired,
  }

  const inputProps: DynamicProps = {}

  if (id) {
    labelProps.htmlFor = id
    inputProps.id = id
  }

  if (isDisabled) {
    inputProps.disabled = true
  }

  if (tabIndex) {
    inputProps.tabIndex = tabIndex
  }

  if (changeHandler) {
    inputProps.onChange = changeHandler
  }

  return (
    <div className={`qmSliderContainer ${className || ""}`}>

      <div className="qmSliderLabelWrapper">
        <Text className="qmSliderValue" text={formattedValue} />
        {label && <Label text={label} {...labelProps} />}
      </div>

      <div className="qmSliderInputWrapper">
        <input
          className="qmSliderInput"
          max={max}
          min={min}
          type="range"
          value={value}
          {...inputProps}>
        </input>
      </div>

    </div>
  )
}

Slider.displayName = "Slider"

export default memo(Slider)
