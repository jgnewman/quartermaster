import React, { memo } from "react"

import type { FauxChangeEventHandler } from "../lib/helperTypes"
import { buildClassNames } from "../lib/helpers"
import { isSameDay } from "./datePickerHelpers"

import {
  useFieldValue,
  useValueSelector,
} from "./hooks"

interface DatePickerButtonProps {
  closeCalendar: () => void
  closeOnChange: boolean
  changeHandler?: FauxChangeEventHandler
  dateStamp: number
  isDisabled: boolean
  pickerValue: number | null
}

function DatePickerButton({
  closeCalendar,
  closeOnChange,
  changeHandler,
  dateStamp,
  isDisabled,
  pickerValue,
}: DatePickerButtonProps) {

  const now = Date.now()
  const buttonDay = (new Date(dateStamp)).getDate()
  const buttonTitle = useFieldValue(dateStamp)

  const isSelected = pickerValue ? isSameDay(pickerValue, dateStamp) : false
  const isToday = isSameDay(now, dateStamp)

  const selectValue = useValueSelector(
    changeHandler,
    closeCalendar,
    closeOnChange,
    dateStamp,
    isSelected,
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
