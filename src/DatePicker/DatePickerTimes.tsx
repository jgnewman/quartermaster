import React, { memo } from "react"

import { getHoursForDay } from "./datePickerHelpers"

interface DatePickerTimesProps {
  dateStamp: number | null
  timesIncrement: 5 | 10 | 15 | 30 | 60
}

function DatePickerTimes({
  dateStamp,
  timesIncrement,
}: DatePickerTimesProps) {

  const now = Date.now()
  const hours = getHoursForDay(dateStamp || now, timesIncrement)

  return (
    <div className="qmDatePickerTimes">
      <span className="qmDatePickerTimeTitle">Time</span>
      <div className="qmDatePickerHours">
        {
          hours.map(hour => (
            <button
              key={hour}
              className="qmDatePickerHour">
              {new Intl.DateTimeFormat("default", {
                hour: "numeric",
                minute: "2-digit",
              }).format(new Date(hour))}
            </button>
          ))
        }
      </div>
    </div>
  )
}

DatePickerTimes.displayName = "DatePickerTimes"

export default memo(DatePickerTimes)
