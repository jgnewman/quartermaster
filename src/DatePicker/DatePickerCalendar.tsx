import React, {
  Dispatch,
  SetStateAction,
  memo,
} from "react"

import type {
  DatePickerChangeHandler,
} from "./types"

import {
  useCalendarData,
} from "./hooks"

import DatePickerCalNav from "./DatePickerCalNav"
import DatePickerDay from "./DatePickerDay"

const sunTitles = ["S", "M", "T", "W", "T", "F", "S"]
const monTitles = ["M", "T", "W", "T", "F", "S", "S"]

interface DatePickerCalendarProps {
  changeHandler?: DatePickerChangeHandler
  currentView: Date
  disablePast?: boolean
  enableRange?: boolean
  endDate: Date | null
  now: Date
  setCurrentView: Dispatch<SetStateAction<Date>>
  startDate: Date | null
  weekStartsOnMonday?: boolean
}

function DatePickerCalendar({
  changeHandler,
  currentView,
  disablePast,
  enableRange,
  endDate,
  now,
  setCurrentView,
  startDate,
  weekStartsOnMonday,
}: DatePickerCalendarProps) {

  const titles = weekStartsOnMonday ? monTitles : sunTitles

  const referenceYear = currentView.getFullYear()
  const referenceMonth = currentView.getMonth()

  const calendarData = useCalendarData(
    disablePast,
    referenceMonth,
    referenceYear,
    weekStartsOnMonday,
  )

  return (
    <div className="qmDatePickerCal">
      <DatePickerCalNav
        currentView={currentView}
        disablePast={disablePast}
        now={now}
        setCurrentView={setCurrentView}
      />

      <section className="qmDatePickerCalHead">
        {
          titles.map((letter, index) => (
            <span key={index} className="qmDatePickerCalColHead">{letter}</span>
          ))
        }
      </section>

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
