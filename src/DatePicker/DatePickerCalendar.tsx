import React, { memo } from "react"

import type { FauxChangeEventHandler } from "../lib/helperTypes"
import Text from "../Text"

import DatePickerDay from "./DatePickerDay"
import { useCalendarData } from "./hooks"

interface DatePickerCalendarProps {
  changeHandler?: FauxChangeEventHandler
  currentView: Date
  disablePast: boolean
  isCompact: boolean
  now: Date
  pickerValue: Date | null
  showTimes: boolean
  timesIncrement: 5 | 10 | 15 | 30 | 60
}

function DatePickerCalendar({
  changeHandler,
  currentView,
  disablePast,
  isCompact,
  now,
  pickerValue,
  showTimes,
  timesIncrement,
}: DatePickerCalendarProps) {

  const calendarRows = useCalendarData(currentView, disablePast)

  return (
    <div className="qmDatePickerCalendar">
      <table className="qmDatePickerDayTable">
        <thead className="qmDatePickerTHead">
          <tr>
            {
              ["S", "M", "T", "W", "T", "F", "S"].map((letter, index) => (
                <th key={index}><Text isBold isSmaller>{letter}</Text></th>
              ))
            }
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
                        date={date}
                        disablePast={disablePast}
                        isCompact={isCompact}
                        isDisabled={isDisabled}
                        now={now}
                        pickerValue={pickerValue}
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
