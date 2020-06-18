import React, {
  memo,
} from "react"

import {
  buildClassNames,
} from "../lib/helpers"

import Slider from "../Slider"

import type {
  DatePickerChangeHandler,
} from "./types"

import {
  useEndTimeSetter,
  useSliderIds,
  useSliderLabels,
  useSliderValues,
  useStartTimeSetter,
  useTimeMappings,
  useValueFormatter,
} from "./hooks"

interface DatePickerTimesProps {
  changeHandler?: DatePickerChangeHandler
  disablePast?: boolean
  enableRange?: boolean
  endDate: Date | null
  isCompact?: boolean
  now: Date
  startDate: Date | null
  timeIncrement: 5 | 10 | 15 | 30 | 60
}

function DatePickerTimes({
  changeHandler,
  disablePast,
  enableRange,
  endDate,
  isCompact,
  now,
  startDate,
  timeIncrement,
}: DatePickerTimesProps) {

  const [startId, endId] = useSliderIds(enableRange)
  const [startLabel, endLabel] = useSliderLabels(enableRange, endDate, startDate)

  const [startTimesMap, endTimesMap] = useTimeMappings(
    disablePast,
    enableRange,
    endDate,
    now,
    startDate,
    timeIncrement,
  )

  const [startValue, startMin, startMax] = useSliderValues(startDate, startTimesMap)
  const [endValue, endMin, endMax] = useSliderValues(endDate, endTimesMap)

  const setStartTime = useStartTimeSetter(
    changeHandler,
    enableRange,
    endDate,
    startDate,
    startTimesMap,
  )

  const setEndTime = useEndTimeSetter(
    changeHandler,
    endDate,
    endTimesMap,
    startDate,
  )

  const startTimeFormatter = useValueFormatter(startTimesMap)
  const endTimeFormatter = useValueFormatter(endTimesMap)

  const wrapperClasses = buildClassNames({
    changeHandler,
    enableRange,
    endDate,
    isCompact,
    startDate,
  })

  return (
    <div className={`qmDatePickerTimes ${wrapperClasses}`}>
      <Slider
        changeHandler={setStartTime}
        className="qmDatePickerSlider isStartDate"
        formatValue={startTimeFormatter}
        id={startId}
        isCompact={isCompact}
        isDisabled={!startDate}
        label={startLabel}
        max={startMax}
        min={startMin}
        value={startValue}
      />

      {enableRange && (
        <Slider
          changeHandler={setEndTime}
          className="qmDatePickerSlider isEndDate"
          formatValue={endTimeFormatter}
          id={endId}
          isCompact={isCompact}
          isDisabled={!endDate}
          label={endLabel}
          max={endMax}
          min={endMin}
          value={endValue}
        />
      )}
    </div>
  )
}

DatePickerTimes.displayName = "DatePickerTimes"

export default memo(DatePickerTimes)
