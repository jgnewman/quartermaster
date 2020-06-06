import React, { memo } from "react"

import type { FauxChangeEventHandler } from "../lib/helperTypes"
import { buildClassNames } from "../lib/helpers"
import { isSameDay } from "./datePickerHelpers"

import {
  useFieldValue,
  useValueSelector,
} from "./hooks"

interface DatePickerButtonProps {
  changeHandler?: FauxChangeEventHandler
  dateStamp: number
  disablePast: boolean
  isDisabled: boolean
  pickerValue: number | null
  showTimes: boolean
  timesIncrement: 5 | 10 | 15 | 30 | 60
}

function DatePickerButton({
  changeHandler,
  dateStamp,
  disablePast,
  isDisabled,
  pickerValue,
  showTimes,
  timesIncrement,
}: DatePickerButtonProps) {

  const now = Date.now()
  const buttonDay = (new Date(dateStamp)).getDate()
  const buttonTitle = useFieldValue(dateStamp)

  const isSelected = pickerValue ? isSameDay(pickerValue, dateStamp) : false
  const isToday = isSameDay(now, dateStamp)

  const selectValue = useValueSelector(
    changeHandler,
    dateStamp,
    disablePast,
    isSelected,
    showTimes,
    timesIncrement,
  )

  const buttonClasses = buildClassNames({
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
