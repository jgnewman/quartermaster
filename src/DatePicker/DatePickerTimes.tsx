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
  useSliderIds,
  useSliderLabels,
} from "./hooks"

interface DatePickerTimesProps {
  changeHandler?: DatePickerChangeHandler
  enableRange?: boolean
  endDate: Date | null
  startDate: Date | null
}

function DatePickerTimes({
  changeHandler,
  enableRange,
  endDate,
  startDate,
}: DatePickerTimesProps) {

  // TODO: Create mappings between selectable times and units on the sliders
  // TODO: Create label formatters for showing the slider times
  // TODO: Create handlers that update the slider times

  const [startId, endId] = useSliderIds(enableRange)
  const [startLabel, endLabel] = useSliderLabels(enableRange, endDate, startDate)

  const wrapperClasses = buildClassNames({
    changeHandler,
    enableRange,
    endDate,
    startDate,
  })

  return (
    <div className={`qmDatePickerTimes ${wrapperClasses}`}>
      <Slider
        changeHandler={() => { return }}
        className="qmDatePickerSlider"
        id={startId}
        isDisabled={!startDate}
        label={startLabel}
        max={10}
        min={1}
        value={5}
      />

      {enableRange && (
        <Slider
          changeHandler={() => { return }}
          className="qmDatePickerSlider"
          id={endId}
          isDisabled={!endDate}
          label={endLabel}
          max={10}
          min={1}
          value={5}
        />
      )}
    </div>
  )
}

DatePickerTimes.displayName = "DatePickerTimes"

export default memo(DatePickerTimes)
