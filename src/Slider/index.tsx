import "./styles.styl"
import React, {
  ChangeEventHandler,
  memo,
} from "react"

import type {
  DynamicProps,
} from "../lib/helperTypes"

import {
  buildClassNames,
} from "../lib/helpers"

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
  isCompact?: boolean
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
  isCompact,
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

  const labelClasses = buildClassNames({
    isCompact,
  })

  const inputWrapperClasses = labelClasses
  const inputClasses = labelClasses

  return (
    <div className={`qmSliderContainer ${className || ""}`}>

      <div className="qmSliderLabelWrapper">
        <Text className="qmSliderValue" text={formattedValue} />
        {label && <Label className={`qmSliderLabel ${labelClasses}`} text={label} {...labelProps} />}
      </div>

      <div className={`qmSliderInputWrapper ${inputWrapperClasses}`}>
        <input
          className={`qmSliderInput ${inputClasses}`}
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
