import React, {
  Ref,
  forwardRef,
  memo,
} from "react"

import type { IconProps } from "./types"
import IconWrapper from "./IconWrapper"

const Success = forwardRef(function (props: IconProps, ref: Ref<SVGSVGElement>) {
  return (
    <IconWrapper ref={ref} title={props.title || "Success icon"} {...props}>
      <circle cx="4" cy="4" r="3.5"></circle>
      <polyline points="2.4 4.2625 3.48333333 5.5 5.65 2.75"></polyline>
    </IconWrapper>
  )
})

Success.displayName = "Success"

export default memo(Success)
