import React, {
  Dispatch,
  RefObject,
  SetStateAction,
  forwardRef,
  memo,
} from "react"

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
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const DatePickerControls = forwardRef(function ({
  changeHandler,
  enableRange,
  isOpen,
  setOpen,
}: DatePickerControls, ref: RefObject<HTMLButtonElement>) {

  const handleClickEx = useClearValue(changeHandler, enableRange)
  const handleClickCheck = useConfirmValue(setOpen)

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
            className="qmDatePickerControl isEx"
            onClick={handleClickEx}>
            <Ex className="qmDatePickerControlIcon isEx" size="s" title="Clear value" />
          </button>

          <button
            className="qmDatePickerControl isCheck"
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
