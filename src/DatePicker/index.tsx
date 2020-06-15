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
  useClickPicker,
  useDateRangeFromValue,
  useFocusInput,
  useCloseOnClickAway,
  useFieldValue,
} from "./hooks"

import DatePickerControls from "./DatePickerControls"
import DatePickerCalendar from "./DatePickerCalendar"
import DatePickerTimes from "./DatePickerTimes"

/*
TODO:
- Allow showing/selecting times
- Make as accessible as possible
- Make compatible with dark mode
*/

export interface DatePickerProps {
  className?: string
  changeHandler?: DatePickerChangeHandler
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
  value?: ValidValue | ValidValueRange
  weekStartsOnMonday?: boolean
}

function DatePicker({
  className,
  changeHandler,
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
  value = null,
  weekStartsOnMonday,
}: DatePickerProps) {

  const isTop = position === "top"
  const isBottom = !isTop
  const now = new Date()

  const [startDate, endDate] = useDateRangeFromValue(
    enableRange,
    value,
  )

  const [currentView, setCurrentView] = useState(startDate || now)
  const [isOpen, setOpen] = useState(false)

  const contentRef = useRef<HTMLDivElement>(null)
  const selectorsRef = useRef<HTMLDivElement>(null)
  const confirmRef = useRef<HTMLButtonElement>(null)

  const handleClickPicker = useClickPicker(
    confirmRef,
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
    isOpen,
  })

  const selectorsClasses = buildClassNames({
    isBottom,
    isTop,
  })

  return (
    <div className={`qmDatePickerContainer ${className || ""}`}>

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

        <DatePickerControls
          changeHandler={changeHandler}
          enableRange={enableRange}
          isOpen={isOpen}
          setOpen={setOpen}
          ref={confirmRef}
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
              now={now}
              setCurrentView={setCurrentView}
              startDate={startDate}
              weekStartsOnMonday={weekStartsOnMonday}
            />

            {enableTimes && (
              <DatePickerTimes
                changeHandler={changeHandler}
                enableRange={enableRange}
                endDate={endDate}
                startDate={startDate}
              />
            )}

          </div>
        )}
      </div>

      {hasError && errorText && (
        <span className="qmDatePickerError">{errorText}</span>
      )}

    </div>
  )
}

DatePicker.displayName = "DatePicker"

export default memo(DatePicker)
