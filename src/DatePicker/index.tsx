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
import TextField from "../TextField"

import Calendar from "../icons/Calendar"
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

  // TODO: ADD AN EX ICON LIKE ON SELECT MENU FOR CLEARING THE VALUE, MAKE SURE DARK MODE WORKS FOR ICONS
  // TODO: WHAT ELSE CAN WE DO FOR ACCESSIBILITY?

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

  return (
    <div className={`qmDatePickerContainer ${className || ""}`}>

      {label && <Label text={label} {...labelProps} />}

      <div className="qmDatePickerFieldWrapper">

        <TextField
          className="qmDatePickerField"
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

        <div className="qmDatePickerIconWrapper" onClick={focusTextField}>
          <Calendar className="qmDatePickerIcon" size="m" title="Pick a date"/>
        </div>

        {isOpen && (
          <div
            className={`qmDatePickerDialog ${positionClasses}`}
            ref={calendarRef}
            role="list"
            aria-expanded={isOpen}>

            <header className="qmDatePickerHeader">
              <Grid>
                <div className="qmDatePickerMonthLeftWrapper">
                  <IconButton
                    className="qmDatePickerButton qmDatePickerMonthLeft"
                    clickHandler={decrementView}>
                    <Triangle size="s" rotate={90} title="Previous month" />
                  </IconButton>
                </div>

                <div className="qmDatePickerTitle">
                  <span className="qmDatePickerTitleText">{calendarTitle}</span>
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
                showTimes={showTimes}
                timesIncrement={timesIncrement}
              />

              {showTimes && (
                <DatePickerTimes
                  changeHandler={changeHandler}
                  dateStamp={dateStamp}
                  disablePast={disablePast}
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
