import React, {
  RefObject,
  forwardRef,
  memo,
} from "react"

import type { FauxChangeEventHandler } from "../lib/helperTypes"
import { buildClassNames } from "../lib/helpers"
import { isSameTime } from "./helpers"
import { useValueSelector } from "./hooks"

interface DatePickerHourProps {
  changeHandler?: FauxChangeEventHandler
  hour: Date
  disablePast: boolean
  isCompact: boolean
  isDisabled: boolean
  pickerValue: Date | null
  timesIncrement: 5 | 10 | 15 | 30 | 60
}

const DatePickerHour = forwardRef(function ({
  changeHandler,
  hour,
  disablePast,
  isCompact,
  isDisabled,
  pickerValue,
  timesIncrement,
}: DatePickerHourProps, ref: RefObject<HTMLButtonElement>) {

  const timeText = new Intl.DateTimeFormat("default", {
    hour: "numeric",
    minute: "2-digit",
  }).format(hour)

  const isSelected = pickerValue ? isSameTime(pickerValue, hour) : false
  const showTimes = true

  const selectValue = useValueSelector(
    changeHandler,
    hour,
    disablePast,
    isSelected,
    showTimes,
    timesIncrement,
  )

  const buttonClasses = buildClassNames({
    isCompact,
    isDisabled,
    isSelected,
  })

  return (
    <button
      ref={ref}
      className={`qmDatePickerHour ${buttonClasses}`}
      disabled={isDisabled}
      onClick={selectValue}>
      {timeText}
    </button>
  )
})

DatePickerHour.displayName = "DatePickerHour"

export default memo(DatePickerHour)
