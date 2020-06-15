import React, {
  Dispatch,
  RefObject,
  SetStateAction,
  forwardRef,
  memo,
} from "react"

import {
  buildClassNames,
} from "../lib/helpers"

import Calendar from "../icons/Calendar"
import Checkmark from "../icons/Checkmark"
import Ex from "../icons/Ex"

import type {
  DatePickerChangeHandler,
} from "./types"

import {
  useClearValue,
  useConfirmValue,
} from "./hooks"

interface DatePickerControls {
  changeHandler?: DatePickerChangeHandler
  enableRange?: boolean
  isCompact?: boolean
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const DatePickerControls = forwardRef(function ({
  changeHandler,
  enableRange,
  isCompact,
  isOpen,
  setOpen,
}: DatePickerControls, ref: RefObject<HTMLButtonElement>) {

  const handleClickEx = useClearValue(changeHandler, enableRange)
  const handleClickCheck = useConfirmValue(setOpen)

  const controlClasses = buildClassNames({
    isCompact,
  })

  const exClasses = `isEx ${controlClasses}`
  const checkClasses = `isCheck ${controlClasses}`

  return (
    <div className="qmDatePickerControls">
      {!isOpen && (
        <div className="qmDatePickerCalIconWrapper">
          <Calendar className="qmDatePickerCalIcon" size="s"/>
        </div>
      )}

      {isOpen && (
        <>
          <button
            className={`qmDatePickerControl ${exClasses}`}
            onClick={handleClickEx}>
            <Ex className="qmDatePickerControlIcon isEx" size="s" title="Clear value" />
          </button>

          <button
            className={`qmDatePickerControl ${checkClasses}`}
            onClick={handleClickCheck}
            ref={ref}>
            <Checkmark className="qmDatePickerControlIcon isCheck" size="s" title="Done" />
          </button>
        </>
      )}
    </div>
  )
})

DatePickerControls.displayName = "DatePickerControls"

export default memo(DatePickerControls)
