import React, {
  memo,
} from "react"

import {
  DatePickerChangeHandler,
} from "./types"

import {
  useCalendarData,
} from "./hooks"

import DatePickerDay from "./DatePickerDay"

const sunTitles = ["S", "M", "T", "W", "T", "F", "S"]
const monTitles = ["M", "T", "W", "T", "F", "S", "S"]

interface DatePickerCalendarProps {
  changeHandler?: DatePickerChangeHandler
  disablePast?: boolean
  enableRange?: boolean
  endDate: Date | null
  now: Date
  startDate: Date | null
  weekStartsOnMonday?: boolean
}

function DatePickerCalendar({
  changeHandler,
  disablePast,
  enableRange,
  endDate,
  now,
  startDate,
  weekStartsOnMonday,
}: DatePickerCalendarProps) {

  const titles = weekStartsOnMonday ? monTitles : sunTitles

  const referenceYear = now.getFullYear()
  const referenceMonth = now.getMonth()

  const calendarData = useCalendarData(
    disablePast,
    referenceMonth,
    referenceYear,
    weekStartsOnMonday,
  )

  return (
    <div className="qmDatePickerCal">
      <header className="qmDatePickerCalHead">
        {
          titles.map((letter, index) => (
            <span key={index} className="qmDatePickerCalColHead">{letter}</span>
          ))
        }
      </header>

      <section className="qmDatePickerCalBody">
        {
          calendarData.map((row, rowIndex) => row.map(({ isDisabled, date }, dayIndex) => (
            <DatePickerDay
              key={`${rowIndex}-${dayIndex}`}
              changeHandler={changeHandler}
              date={date}
              enableRange={enableRange}
              endDate={endDate}
              now={now}
              isDisabled={isDisabled}
              startDate={startDate}
            />
          )))
        }
      </section>
    </div>
  )
}

DatePickerCalendar.displayName = "DatePickerCalendar"

export default memo(DatePickerCalendar)
