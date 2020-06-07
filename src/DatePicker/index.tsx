import "./styles.styl"

import React, {
  memo,
  useRef,
  useState,
} from "react"

import type {
  DynamicProps,
  FauxChangeEventHandler,
} from "../lib/helperTypes"

import { buildClassNames } from "../lib/helpers"

import Grid from "../Grid"
import IconButton from "../IconButton"
import Label from "../Label"
import Text from "../Text"
import TextField from "../TextField"

import Calendar from "../icons/Calendar"
import Ex from "../icons/Ex"
import Reload from "../icons/Reload"
import Triangle from "../icons/Triangle"

import DatePickerCalendar from "./DatePickerCalendar"
import DatePickerTimes from "./DatePickerTimes"

import {
  useCalendarState,
  useCalendarTitle,
  useCloseCalendarOnClickAway,
  useDateStamp,
  useFieldFocuser,
  useFieldValue,
  useMonthDecrementor,
  useMonthIncrementor,
  useMonthResetter,
  useValueResetter,
} from "./hooks"

export interface DatePickerProps {
  changeHandler?: FauxChangeEventHandler
  className?: string
  disablePast?: boolean
  errorText?: string
  hasError?: boolean
  id?: string
  isCompact?: boolean
  isDisabled?: boolean
  isRequired?: boolean
  label?: string
  placeholder?: string
  position?: "top" | "bottom"
  showTimes?: boolean
  tabIndex?: number
  timesIncrement?: 5 | 10 | 15 | 30 | 60
  value?: Date | number | string | null
}

function DatePicker({
  changeHandler,
  className,
  disablePast = false,
  errorText,
  hasError,
  id,
  isCompact = false,
  isDisabled = false,
  isRequired = false,
  label,
  placeholder,
  position = "bottom",
  showTimes = false,
  tabIndex,
  timesIncrement = 60,
  value,
}: DatePickerProps) {

  const dateStamp = useDateStamp(value)
  const calendarRef = useRef(null)
  const fieldRef = useRef(null)

  const { isOpen, closeCalendar, openCalendar } = useCalendarState(false)
  const [currentView, setCurrentView] = useState(dateStamp || Date.now())

  const fieldValue = useFieldValue(dateStamp, showTimes)
  const calendarTitle = useCalendarTitle(currentView)

  const decrementView = useMonthDecrementor(currentView, setCurrentView)
  const incrementView = useMonthIncrementor(currentView, setCurrentView)
  const resetView = useMonthResetter(setCurrentView)
  const focusTextField = useFieldFocuser(fieldRef)
  const clearValue = useValueResetter(changeHandler)

  useCloseCalendarOnClickAway(
    calendarRef,
    closeCalendar,
    isOpen,
  )

  const labelProps: DynamicProps = {
    className: "qmTextFieldLabel",
    isRequired,
  }

  if (id) {
    labelProps.htmlFor = id
  }

  const positionClasses = buildClassNames({
    isTop: position === "top",
    isBottom: position === "bottom",
  })

  const fieldClasses = buildClassNames({
    hasValue: !!value,
  })

  return (
    <div className={`qmDatePickerContainer ${className || ""}`}>

      {label && <Label text={label} {...labelProps} />}

      <div className="qmDatePickerFieldWrapper">

        <TextField
          className={`qmDatePickerField ${fieldClasses}`}
          errorText={errorText}
          focusHandler={openCalendar}
          hasError={hasError}
          id={id}
          ignoreLastPass={true}
          isCompact={isCompact}
          isDisabled={isDisabled}
          isReadOnly={true}
          isRequired={isRequired}
          placeholder={placeholder}
          ref={fieldRef}
          tabIndex={tabIndex}
          type="text"
          value={fieldValue}
        />

        <div className="qmDatePickerOverlay" onClick={focusTextField}></div>

        <div className="qmDatePickerIcons">
          {value && (
            <button className={`qmDatePickerClearButton`} onClick={clearValue}>
              <Ex
                className="qmDatePickerIcon qmDatePickerClearIcon"
                size="s"
                title="Clear date"
              />
            </button>
          )}

          <div className="qmDatePickerIconWrapper" role="button" onClick={focusTextField}>
            <Calendar
              className="qmDatePickerIcon qmDatePickerDateIcon"
              size="s"
              title="Pick a date"
            />
          </div>
        </div>

        {isOpen && (
          <div
            className={`qmDatePickerDialog ${positionClasses}`}
            ref={calendarRef}
            aria-expanded={isOpen}>

            <header className="qmDatePickerHeader">
              <Grid gutterW="s">
                <div className="qmDatePickerMonthLeftWrapper">
                  <IconButton
                    className="qmDatePickerButton qmDatePickerMonthLeft"
                    clickHandler={decrementView}>
                    <Triangle size="s" rotate={90} title="Previous month" />
                  </IconButton>
                </div>

                <div className="qmDatePickerTitle">
                  <Text className="qmDatePickerTitleText" isBold>{calendarTitle}</Text>
                  <IconButton
                    className="qmDatePickerButton qmDatePickerReset"
                    clickHandler={resetView}>
                    <Reload size="s" title="Back to today" />
                  </IconButton>
                </div>

                <div className="qmDatePickerMonthRightWrapper">
                  <IconButton
                    className="qmDatePickerButton qmDatePickerMonthRight"
                    clickHandler={incrementView}>
                    <Triangle size="s" rotate={270} title="Next month" />
                  </IconButton>
                </div>
              </Grid>
            </header>

            <div className="qmDatePickerSelectorsWrapper">
              <DatePickerCalendar
                changeHandler={changeHandler}
                currentView={currentView}
                dateStamp={dateStamp}
                disablePast={disablePast}
                isCompact={isCompact}
                showTimes={showTimes}
                timesIncrement={timesIncrement}
              />

              {showTimes && (
                <DatePickerTimes
                  changeHandler={changeHandler}
                  dateStamp={dateStamp}
                  disablePast={disablePast}
                  isCompact={isCompact}
                  timesIncrement={timesIncrement}
                />
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

DatePicker.displayName = "DatePicker"

export default memo(DatePicker)
