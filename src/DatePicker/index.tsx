import "./styles.styl"

import React, {
  ChangeEventHandler,
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

  const [isOpen, setIsOpen] = useState(false)
  const dateStamp = useDateStamp(value)
  const dateString = useDateString(dateStamp)

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
                          <button disabled={isDisabled}>
                            {date.getDate()}
                          </button>
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
