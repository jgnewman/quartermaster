import React, {
  memo,
} from "react"

import {
  buildClassNames,
} from "../lib/helpers"

import {
  DatePickerChangeHandler,
} from "./types"

interface DatePickerTimesProps {
  changeHandler?: DatePickerChangeHandler
  enableRange?: boolean
  endDate: Date | null
  startDate: Date | null
}

function DatePickerTimes({
  changeHandler,
  enableRange,
  endDate,
  startDate,
}: DatePickerTimesProps) {

  const wrapperClasses = buildClassNames({
    changeHandler,
    enableRange,
    endDate,
    startDate,
  })

  return (
    <div className={`qmDatePickerTimes ${wrapperClasses}`}>

    </div>
  )
}

DatePickerTimes.displayName = "DatePickerTimes"

export default memo(DatePickerTimes)
