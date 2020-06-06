import React, { memo } from "react"

import type { FauxChangeEventHandler } from "../lib/helperTypes"
import DatePickerDay from "./DatePickerDay"

import { useCalendarData } from "./hooks"

interface DatePickerCalendarProps {
  closeCalendar: () => void
  closeOnChange: boolean
  changeHandler?: FauxChangeEventHandler
  currentView: number
  dateStamp: number | null
}

function DatePickerCalendar({
  closeCalendar,
  closeOnChange,
  changeHandler,
  currentView,
  dateStamp,
}: DatePickerCalendarProps) {

  const calendarRows = useCalendarData(currentView)

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
                        closeCalendar={closeCalendar}
                        closeOnChange={closeOnChange}
                        changeHandler={changeHandler}
                        dateStamp={date.getTime()}
                        isDisabled={isDisabled}
                        pickerValue={dateStamp}
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
