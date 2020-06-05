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
import TextField from "../TextField"
import Label from "../Label"
import IconButton from "../IconButton"
import Triangle from "../icons/Triangle"

import { isSameDay } from "./datePickerHelpers"

import {
  useCalendarData,
  useCalendarState,
  useCalendarTitle,
  useCloseCalendarOnClickAway,
  useDateStamp,
  useFieldValue,
  useMonthDecrementor,
  useMonthIncrementor,
  useValueSelector,
} from "./hooks"

interface DatePickerButtonProps {
  closeCalendar: () => void
  closeOnChange: boolean
  changeHandler?: FauxChangeEventHandler
  dateStamp: number
  isDisabled: boolean
  pickerValue: number | null
}

const DatePickerButton = memo(function({
  closeCalendar,
  closeOnChange,
  changeHandler,
  dateStamp,
  isDisabled,
  pickerValue,
}: DatePickerButtonProps) {

  const now = Date.now()
  const buttonDay = (new Date(dateStamp)).getDate()

  const isSelected = pickerValue ? isSameDay(pickerValue, dateStamp) : false
  const isToday = isSameDay(now, dateStamp)

  const selectValue = useValueSelector(
    changeHandler,
    closeCalendar,
    closeOnChange,
    dateStamp,
    isSelected,
  )

  const buttonClasses = buildClassNames({
    isDisabled,
    isSelected,
    isToday,
  })

  return (
    <button
      className={`qmDatePickerDay ${buttonClasses}`}
      disabled={isDisabled}
      onClick={selectValue}>
      {buttonDay}
    </button>
  )
})

DatePickerButton.displayName = "DatePickerButton"

export interface DatePickerProps {
  changeHandler?: FauxChangeEventHandler
  closeOnChange?: boolean
  className?: string
  errorText?: string
  hasError?: boolean
  id?: string
  isCompact?: boolean
  isDisabled?: boolean
  isRequired?: boolean
  label?: string
  placeholder?: string
  position?: "top" | "bottom"
  tabIndex?: number
  value?: Date | number | string | null
}

function DatePicker({
  changeHandler,
  className,
  closeOnChange = false,
  errorText,
  hasError,
  id,
  isCompact = false,
  isDisabled = false,
  isRequired = false,
  label,
  placeholder,
  position = "bottom",
  tabIndex,
  value,
}: DatePickerProps) {

  // TODO: MAKE SURE THIS WORKS WITH THE FORM COMPONENT
  // TODO: APPEARS TOO HIGH WHEN POSITION IS TOP
  // TODO: JUMP TO TODAY
  // TODO: STYLE FOR DARK MODE

  const dateStamp = useDateStamp(value)
  const calendarRef = useRef(null)

  const { isOpen, closeCalendar, toggleCalendar } = useCalendarState(false)
  const [currentView, setCurrentView] = useState(dateStamp || Date.now())

  const fieldValue = useFieldValue(dateStamp)
  const calendarTitle = useCalendarTitle(currentView)
  const calendarRows = useCalendarData(currentView)

  const decrementView = useMonthDecrementor(currentView, setCurrentView)
  const incrementView = useMonthIncrementor(currentView, setCurrentView)

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

      <div
        className="qmDatePickerFieldWrapper"
        onClick={toggleCalendar}>

        <TextField
          className="qmDatePickerField"
          errorText={errorText}
          hasError={hasError}
          id={id}
          ignoreLastPass={true}
          isCompact={isCompact}
          isDisabled={isDisabled}
          isRequired={isRequired}
          placeholder={placeholder}
          tabIndex={tabIndex}
          type="text"
          value={fieldValue}
        />
        <div className="qmDatePickerOverlay"></div>

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
                  className="qmDatePickerMonthLeft"
                  clickHandler={decrementView}>
                  <Triangle size="s" rotate={90} title="Previous month" />
                </IconButton>
              </div>

              <div className="qmDatePickerTitle">
                {calendarTitle}
              </div>

              <div className="qmDatePickerMonthRightWrapper">
                <IconButton
                  className="qmDatePickerMonthRight"
                  clickHandler={incrementView}>
                  <Triangle size="s" rotate={270} title="Next month" />
                </IconButton>
              </div>
            </Grid>
          </header>

          <table className="qmDatePickerDays">
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
                          <DatePickerButton
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
      )}
    </div>
  )
}

DatePicker.displayName = "DatePicker"

export default memo(DatePicker)
