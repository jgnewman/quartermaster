import React, {
  Ref,
  forwardRef,
  memo,
} from "react"

import type { IconProps } from "./types"
import IconWrapper from "./IconWrapper"

const Calendar = forwardRef(function (props: IconProps, ref: Ref<SVGSVGElement>) {
  return (
    <IconWrapper ref={ref} title={props.title || "Calendar icon"} {...props}>
      <circle className="qmPathIsFilled qmPathIsNoStroke" cx="4" cy="4.75" r="1"></circle>
      <path d="M2.5,0.5 L2.5,2.5"></path>
      <path d="M5.5,0.5 L5.5,2.5"></path>
      <rect x="0.5" y="1.5" width="7" height="6"></rect>
    </IconWrapper>
  )
})

Calendar.displayName = "Calendar"

export default memo(Calendar)
