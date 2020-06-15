import React, {
  Dispatch,
  SetStateAction,
  memo,
} from "react"

import {
  DatePickerChangeHandler,
} from "./types"

import {
  useCalendarData,
  useCalendarMonthName,
  useDecrementMonth,
  useIncrementMonth,
  useRefreshView,
} from "./hooks"

import Align from "../Align"
import Caret from "../icons/Caret"
import Reload from "../icons/Reload"
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

  const monthName = useCalendarMonthName(currentView)

  const calendarData = useCalendarData(
    disablePast,
    referenceMonth,
    referenceYear,
    weekStartsOnMonday,
  )

  const handleClickReload = useRefreshView(now, setCurrentView)
  const handleClickLeft = useDecrementMonth(currentView, setCurrentView)
  const handleClickRight = useIncrementMonth(currentView, setCurrentView)

  return (
    <div className="qmDatePickerCal">
      <header className="qmDatePickerCalNav">
        <div className="qmDatePickerCalBtnWrapper">
          <button
            className="qmDatePickerMonthBtn isLeft"
            onClick={handleClickLeft}>
            <Caret size="s" rotate={90} />
          </button>
        </div>

        <Align className="qmDatePickerCalTitle" justify="center">
          <span className="qmDatePickerCalTitleText">{monthName}</span>
          <button
            className="qmDatePickerMonthBtn isReload"
            onClick={handleClickReload}>
            <Reload size="s"/>
          </button>
        </Align>

        <div className="qmDatePickerCalBtnWrapper">
          <button
            className="qmDatePickerMonthBtn isRight"
            onClick={handleClickRight}>
            <Caret size="s" rotate={270} />
          </button>
        </div>
      </header>

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
