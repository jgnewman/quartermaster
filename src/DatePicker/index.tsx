import "./styles.styl"

import React, {
  memo,
  useRef,
  useState,
} from "react"

import type {
  DynamicProps,
} from "../lib/helperTypes"

import {
  buildClassNames,
} from "../lib/helpers"

import Label from "../Label"

import type {
  DatePickerChangeHandler,
  ValidValue,
  ValidValueRange,
} from "./types"

import {
  setDateToNextIncrement,
} from "./helpers"

import {
  useClickPicker,
  useDateRangeFromValue,
  useFocusInput,
  useCloseOnBlurContainer,
  useCloseOnClickAway,
  useFieldValue,
} from "./hooks"

import DatePickerControls from "./DatePickerControls"
import DatePickerCalendar from "./DatePickerCalendar"
import DatePickerTimes from "./DatePickerTimes"

export interface DatePickerProps {
  changeHandler?: DatePickerChangeHandler
  className?: string
  disablePast?: boolean
  enableRange?: boolean
  enableTimes?: boolean
  errorText?: string
  hasError?: boolean
  id?: string
  isCompact?: boolean
  isDisabled?: boolean
  isRequired?: boolean
  label?: string
  placeholder?: string
  position?: "top" | "bottom"
  timeIncrement?: 5 | 10 | 15 | 30 | 60
  value?: ValidValue | ValidValueRange
  weekStartsOnMonday?: boolean
}

function DatePicker({
  changeHandler,
  className,
  disablePast,
  enableRange,
  enableTimes,
  errorText,
  hasError,
  id,
  isCompact,
  isDisabled,
  isRequired,
  label,
  placeholder,
  position = "bottom",
  timeIncrement = 60,
  value = null,
  weekStartsOnMonday,
}: DatePickerProps) {

  const isTop = position === "top"
  const isBottom = !isTop

  const now = new Date()
  enableTimes && setDateToNextIncrement(now, timeIncrement)

  const [startDate, endDate] = useDateRangeFromValue(
    disablePast,
    enableRange,
    enableTimes,
    now,
    timeIncrement,
    value,
  )

  const [currentView, setCurrentView] = useState(startDate || now)
  const [isOpen, setOpen] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const selectorsRef = useRef<HTMLDivElement>(null)
  const confirmRef = useRef<HTMLButtonElement>(null)

  const handleClickPicker = useClickPicker(
    confirmRef,
    isDisabled,
    setOpen,
  )

  const handleFocusInput = useFocusInput(
    setOpen,
  )

  const fieldValue = useFieldValue(
    enableRange,
    enableTimes,
    endDate,
    startDate,
  )

  useCloseOnClickAway(
    contentRef,
    isOpen,
    selectorsRef,
    setOpen,
  )

  useCloseOnBlurContainer(
    containerRef,
    isOpen,
    setOpen,
  )

  const labelProps: DynamicProps = {
    className: "qmTextFieldLabel",
    isRequired,
  }

  if (id) {
    labelProps.htmlFor = id
  }

  const contentClasses = buildClassNames({
    isOpen,
  })

  const inputClasses = buildClassNames({
    isCompact,
    isDisabled,
    isOpen,
  })

  const selectorsClasses = buildClassNames({
    isBottom,
    isCompact,
    isTop,
  })

  return (
    <div className={`qmDatePickerContainer ${className || ""}`} ref={containerRef}>

      {label && <Label text={label} {...labelProps} />}

      <div
        className={`qmDatePickerContent ${contentClasses}`}
        ref={contentRef}
        onClick={handleClickPicker}
      >

        <input
          className={`qmDatePickerInput ${inputClasses}`}
          disabled={!!isDisabled}
          id={id}
          onFocus={handleFocusInput}
          placeholder={placeholder || ""}
          readOnly
          type="text"
          value={fieldValue}
        />

        {isOpen && (
          <div
            className={`qmDatePickerSelectors ${selectorsClasses}`}
            ref={selectorsRef}
          >
            <DatePickerCalendar
              changeHandler={changeHandler}
              currentView={currentView}
              disablePast={disablePast}
              enableRange={enableRange}
              endDate={endDate}
              isCompact={isCompact}
              now={now}
              setCurrentView={setCurrentView}
              startDate={startDate}
              weekStartsOnMonday={weekStartsOnMonday}
            />

            {enableTimes && (
              <DatePickerTimes
                changeHandler={changeHandler}
                disablePast={disablePast}
                enableRange={enableRange}
                endDate={endDate}
                isCompact={isCompact}
                now={now}
                startDate={startDate}
                timeIncrement={timeIncrement}
              />
            )}

          </div>
        )}

        <DatePickerControls
          changeHandler={changeHandler}
          enableRange={enableRange}
          isCompact={isCompact}
          isDisabled={isDisabled}
          isOpen={isOpen}
          setOpen={setOpen}
          ref={confirmRef}
        />
      </div>

      {hasError && errorText && (
        <span className="qmDatePickerError">{errorText}</span>
      )}

    </div>
  )
}

DatePicker.displayName = "DatePicker"

export default memo(DatePicker)
