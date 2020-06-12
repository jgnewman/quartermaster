import "./styles.styl"
import React, { memo } from "react"

/*
TODO:
- Look nice
- Show formatted date
- Show invalid date
- Go forward a month
- Go back a month
- Re-center on today
- Clear value
- Click to "finish"
- Allow showing/selecting times
- Allow selecting a range
- Highlight today
- Highlight selected day
- Highlight selected time
- Highlight selected range
- Value should be a number if not a range selector
- Value should be a number[] if is a range selector
*/

export interface DatePickerProps {
  className?: string
}

function DatePicker({
  className,
}: DatePickerProps) {

  return (
    <div className={`qmDatePickerContainer ${className || ""}`}>

    </div>
  )
}

DatePicker.displayName = "DatePicker"

export default memo(DatePicker)
