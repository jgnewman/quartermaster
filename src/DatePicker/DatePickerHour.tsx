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
  dateStamp: number
  disablePast: boolean
  isCompact: boolean
  isDisabled: boolean
  pickerValue: number | null
  timesIncrement: 5 | 10 | 15 | 30 | 60
}

const DatePickerHour = forwardRef(function ({
  changeHandler,
  dateStamp,
  disablePast,
  isCompact,
  isDisabled,
  pickerValue,
  timesIncrement,
}: DatePickerHourProps, ref: RefObject<HTMLButtonElement>) {

  const timeText = new Intl.DateTimeFormat("default", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(dateStamp))

  const isSelected = pickerValue ? isSameTime(pickerValue, dateStamp) : false
  const showTimes = true

  const selectValue = useValueSelector(
    changeHandler,
    dateStamp,
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
