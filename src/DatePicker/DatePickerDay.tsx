import React, {
  memo,
} from "react"

import {
  buildClassNames,
} from "../lib/helpers"

import type {
  DatePickerChangeHandler,
} from "./types"

import {
  isSameDay,
} from "./helpers"

import {
  useDayTitle,
  useMemoizedSameDay,
  useValueSetter,
} from "./hooks"

interface DatePickerDayProps {
  changeHandler?: DatePickerChangeHandler
  date: Date
  enableRange?: boolean
  endDate: Date | null
  now: Date
  isDisabled: boolean
  startDate: Date | null
}

function DatePickerDay({
  changeHandler,
  date,
  enableRange,
  endDate,
  now,
  isDisabled,
  startDate,
}: DatePickerDayProps) {

  const title = useDayTitle(date)

  const isToday = isSameDay(date, now)
  const isStartDate = useMemoizedSameDay(date, startDate)
  const isEndDate = useMemoizedSameDay(date, endDate)
  const isSelected = isStartDate || isEndDate

  const isInRange = enableRange
    && startDate
    && endDate
    && !isStartDate
    && !isEndDate
    && date > startDate
    && date < endDate

  const handleClickDay = useValueSetter(
    changeHandler,
    date,
    enableRange,
    endDate,
    isEndDate,
    isSelected,
    isStartDate,
    startDate,
  )

  const wrapperClasses = buildClassNames({
    isDisabled,
    isEndDate: isEndDate && !!startDate,
    isInRange,
    isStartDate: isStartDate && !!endDate,
    isToday,
  })

  const buttonClasses = buildClassNames({
    isDisabled,
    isSelected,
    isToday,
  })

  return (
    <div className={`qmDatePickerCalDay ${wrapperClasses}`}>
      <button
        className={`qmDatePickerCalBtn ${buttonClasses}`}
        disabled={isDisabled}
        onClick={handleClickDay}
        title={title}>
        {date.getDate()}
      </button>
    </div>
  )
}

DatePickerDay.displayName = "DatePickerDay"

export default memo(DatePickerDay)
