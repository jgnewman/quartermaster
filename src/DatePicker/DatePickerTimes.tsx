import React, {
  memo,
  useRef,
} from "react"

import type { FauxChangeEventHandler } from "../lib/helperTypes"
import { buildClassNames } from "../lib/helpers"
import Text from "../Text"

import { getHoursForDay } from "./helpers"
import { useScrollToSelectedTime } from "./hooks"
import DatePickerHour from "./DatePickerHour"

interface DatePickerTimesProps {
  changeHandler?: FauxChangeEventHandler
  dateStamp: number | null
  disablePast: boolean
  isCompact: boolean
  timesIncrement: 5 | 10 | 15 | 30 | 60
}

function DatePickerTimes({
  changeHandler,
  dateStamp,
  disablePast,
  isCompact,
  timesIncrement,
}: DatePickerTimesProps) {

  const now = Date.now()
  const hours = getHoursForDay(dateStamp || now, timesIncrement)
  const totalHours = hours.length

  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const firstEnabledButtonRef = useRef<HTMLButtonElement>(null)
  const enabledButtonIndexRef = useRef(0)
  let foundEnabledButton = false

  useScrollToSelectedTime(
    enabledButtonIndexRef,
    firstEnabledButtonRef,
    scrollAreaRef,
    totalHours,
  )

  const scrollAreaClasses = buildClassNames({
    isCompact,
  })

  return (
    <div className="qmDatePickerTimes">
      <Text className="qmDatePickerTimeTitle" isBold isSmaller>Time</Text>
      <div className={`qmDatePickerHours ${scrollAreaClasses}`} ref={scrollAreaRef}>
        {
          hours.map((hour, index) => {
            const isBeforeNow = hour < now
            const isDisabled = disablePast ? isBeforeNow : false
            const isFirstEnabledButton = !isBeforeNow && !isDisabled && !foundEnabledButton

            if (isFirstEnabledButton) {
              foundEnabledButton = true
              enabledButtonIndexRef.current = index
            }

            return (
              <DatePickerHour
                key={hour}
                ref={isFirstEnabledButton ? firstEnabledButtonRef : null}
                changeHandler={changeHandler}
                hourStamp={hour}
                disablePast={disablePast}
                isCompact={isCompact}
                isDisabled={isDisabled}
                pickerValue={dateStamp}
                timesIncrement={timesIncrement}
              />
            )
          })
        }
      </div>
    </div>
  )
}

DatePickerTimes.displayName = "DatePickerTimes"

export default memo(DatePickerTimes)
