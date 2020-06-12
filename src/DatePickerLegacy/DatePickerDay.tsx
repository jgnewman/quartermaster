import React, { memo } from "react"

import type { FauxChangeEventHandler } from "../lib/helperTypes"
import { buildClassNames } from "../lib/helpers"
import { isSameDay } from "./helpers"

import {
  useFieldValue,
  useValueSelector,
} from "./hooks"

interface DatePickerButtonProps {
  changeHandler?: FauxChangeEventHandler
  date: Date
  disablePast: boolean
  isCompact: boolean
  isDisabled: boolean
  now: Date
  pickerValue: Date | null
  showTimes: boolean
  timesIncrement: 5 | 10 | 15 | 30 | 60
}

function DatePickerButton({
  changeHandler,
  date,
  disablePast,
  isCompact,
  isDisabled,
  now,
  pickerValue,
  showTimes,
  timesIncrement,
}: DatePickerButtonProps) {

  const buttonDay = date.getDate()
  const buttonTitle = useFieldValue(date)

  const isSelected = pickerValue ? isSameDay(pickerValue, date) : false
  const isToday = isSameDay(now, date)

  const selectValue = useValueSelector(
    changeHandler,
    date,
    disablePast,
    isSelected,
    showTimes,
    timesIncrement,
  )

  const buttonClasses = buildClassNames({
    isCompact,
    isDisabled,
    isSelected,
    isToday,
  })

  return (
    <button
      className={`qmDatePickerDay ${buttonClasses}`}
      title={buttonTitle}
      disabled={isDisabled}
      onClick={selectValue}>
      {buttonDay}
    </button>
  )
}

DatePickerButton.displayName = "DatePickerButton"

export default memo(DatePickerButton)
