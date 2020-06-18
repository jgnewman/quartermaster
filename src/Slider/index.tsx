import "./styles.styl"
import React, {
  ChangeEventHandler,
  ReactNode,
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

interface TicksProps {
  max: number
  min: number
}

const Ticks = memo(function ({ max, min }: TicksProps) {
  const ticks: ReactNode[] = []

  while (min <= max) {
    ticks.push(<span key={min} className="qmSliderTick"></span>)
    min += 1
  }

  return (
    <div className="qmSliderTicks">
      {ticks}
    </div>
  )
})

Ticks.displayName = "Ticks"

export interface SliderProps {
  changeHandler?: ChangeEventHandler
  className?: string
  formatValue?: (n: number) => string
  hasTicks?: boolean
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
  hasTicks,
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

  const containerClasses = buildClassNames({
    isCompact,
    hasTicks,
  })

  const labelClasses = buildClassNames({
    isCompact,
  })

  const inputWrapperClasses = labelClasses
  const inputClasses = labelClasses

  return (
    <div className={`qmSliderContainer ${containerClasses} ${className || ""}`}>
      {hasTicks && <Ticks max={max} min={min} />}

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
