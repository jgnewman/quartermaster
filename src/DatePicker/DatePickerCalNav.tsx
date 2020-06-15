import React, {
  Dispatch,
  SetStateAction,
  memo,
} from "react"

import {
  buildClassNames,
} from "../lib/helpers"

import Align from "../Align"
import Text from "../Text"
import Caret from "../icons/Caret"
import Reload from "../icons/Reload"

import {
  useCalendarMonthName,
  useDecrementMonth,
  useEnableLeftButton,
  useIncrementMonth,
  useRefreshView,
} from "./hooks"

interface DatePickerCalNavProps {
  currentView: Date
  disablePast?: boolean
  isCompact?: boolean
  now: Date
  setCurrentView: Dispatch<SetStateAction<Date>>
}

function DatePickerCalNav({
  currentView,
  disablePast,
  isCompact,
  now,
  setCurrentView,
}: DatePickerCalNavProps) {

  const monthName = useCalendarMonthName(currentView)
  const handleClickReload = useRefreshView(now, setCurrentView)
  const handleClickLeft = useDecrementMonth(currentView, setCurrentView)
  const handleClickRight = useIncrementMonth(currentView, setCurrentView)
  const shouldEnableLeftButton = useEnableLeftButton(currentView, disablePast, now)

  const navClasses = buildClassNames({
    isCompact,
  })

  return (
    <header className={`qmDatePickerCalNav ${navClasses}`}>
      <div className="qmDatePickerCalBtnWrapper">
        {shouldEnableLeftButton && (
          <button
            className="qmDatePickerMonthBtn isLeft"
            onClick={handleClickLeft}>
            <Caret size="s" rotate={90} />
          </button>
        )}
      </div>

      <Align className="qmDatePickerCalTitle" justify="center">
        <Text className="qmDatePickerCalTitleText" text={monthName} />
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
  )
}

DatePickerCalNav.displayName = "DatePickerCalNav"

export default memo(DatePickerCalNav)
