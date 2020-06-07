import React, { memo } from "react"

import type { FauxChangeEventHandler } from "../lib/helperTypes"
import DatePickerDay from "./DatePickerDay"

import { useCalendarData } from "./hooks"

interface DatePickerCalendarProps {
  changeHandler?: FauxChangeEventHandler
  currentView: number
  dateStamp: number | null
  disablePast: boolean
  isCompact: boolean
  showTimes: boolean
  timesIncrement: 5 | 10 | 15 | 30 | 60
}

function DatePickerCalendar({
  changeHandler,
  currentView,
  dateStamp,
  disablePast,
  isCompact,
  showTimes,
  timesIncrement,
}: DatePickerCalendarProps) {

  const calendarRows = useCalendarData(currentView, disablePast)

  return (
    <div className="qmDatePickerCalendar">
      <table className="qmDatePickerDayTable">
        <thead className="qmDatePickerTHead">
          <tr>
            <th>S</th>
            <th>M</th>
            <th>T</th>
            <th>W</th>
            <th>T</th>
            <th>F</th>
            <th>S</th>
          </tr>
        </thead>
        <tbody>
          {
            calendarRows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {
                  row.map(({ isDisabled, date }, dayIndex) => (
                    <td key={`${rowIndex}${dayIndex}`}>
                      <DatePickerDay
                        changeHandler={changeHandler}
                        dateStamp={date.getTime()}
                        disablePast={disablePast}
                        isCompact={isCompact}
                        isDisabled={isDisabled}
                        pickerValue={dateStamp}
                        showTimes={showTimes}
                        timesIncrement={timesIncrement}
                      />
                    </td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

DatePickerCalendar.displayName = "DatePickerCalendar"

export default memo(DatePickerCalendar)
