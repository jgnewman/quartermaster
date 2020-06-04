import "./styles.styl"

import React, {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  memo,
  useState,
} from "react"

import type { DynamicProps } from "../lib/helperTypes"
import { buildClassNames } from "../lib/helpers"

import Grid from "../Grid"
import TextField from "../TextField"
import Label from "../Label"
import IconButton from "../IconButton"
import Triangle from "../icons/Triangle"

import {
  getCalendarDataForMonth,
} from "./datePickerHelpers"

import {
  useDateStamp,
  useDateString,
} from "./hooks"

interface DatePickerButtonProps {
  isDisabled: boolean
  date: Date
  pickerValue: number | null
  setPickerValue: Dispatch<SetStateAction<number | null>>
}

const DatePickerButton = memo(function({
  isDisabled,
  date,
  pickerValue,
  setPickerValue,
}: DatePickerButtonProps) {

  const buttonDay = date.getDate()
  const buttonMonth = date.getMonth()
  const buttonYear = date.getFullYear()
  const buttonStamp = date.getTime()

  const pickerDate = pickerValue ? new Date(pickerValue) : null
  const pickerDay = pickerDate ? pickerDate.getDate() : null
  const pickerMonth = pickerDate ? pickerDate.getMonth() : null
  const pickerYear = pickerDate ? pickerDate.getFullYear() : null

  const isSelected = pickerDay === buttonDay && pickerMonth === buttonMonth && pickerYear === buttonYear

  const buttonClasses = buildClassNames({
    isSelected,
    isDisabled,
  })

  const selectValue = React.useCallback(() => {
    setPickerValue(buttonStamp) // TODO: Replace this with the change handler
  }, [buttonStamp, setPickerValue])

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
  changeHandler?: ChangeEventHandler
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
  className,
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

  const dateStamp = useDateStamp(value)
  const dateString = useDateString(dateStamp)

  const [isOpen, setIsOpen] = useState(false)
  const [pickerValue, setPickerValue] = useState(dateStamp)
  console.log(pickerValue)

  const calendarRows = getCalendarDataForMonth(dateStamp || Date.now())

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
        onClick={() => setIsOpen(true)}>

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
          value={dateString}
        />
        <div className="qmDatePickerOverlay"></div>

      </div>

      {isOpen && (
        <div className={`qmDatePickerDialog ${positionClasses}`} role="list" aria-expanded={isOpen}>

          <header className="qmDatePickerHeader">
            <Grid>
              <div className="qmDatePickerMonthLeftWrapper">
                <IconButton
                  className="qmDatePickerMonthLeft">
                  <Triangle size="s" rotate={90} title="Previous month" />
                </IconButton>
              </div>

              <div className="qmDatePickerTitle">
                May 2020
              </div>

              <div className="qmDatePickerMonthRightWrapper">
                <IconButton
                  className="qmDatePickerMonthRight">
                  <Triangle size="s" rotate={270} title="Next month" />
                </IconButton>
              </div>
            </Grid>
          </header>

          <table className="qmDatePickerDays">
            <tbody>
              {
                calendarRows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {
                      row.map(({ isDisabled, date }, dayIndex) => (
                        <td key={`${rowIndex}${dayIndex}`}>
                          <DatePickerButton
                            isDisabled={isDisabled}
                            pickerValue={pickerValue}
                            setPickerValue={setPickerValue}
                            date={date}
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
