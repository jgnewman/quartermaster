import React, {
  Ref,
  forwardRef,
  memo,
} from "react"

import type { IconProps } from "./iconTypes"
import IconWrapper from "./IconWrapper"

const Dot = forwardRef(function (props: IconProps, ref: Ref<SVGSVGElement>) {
  return (
    <IconWrapper ref={ref} title={props.title || "Dot icon"} {...props}>
      <circle cx="4" cy="4" r="1"></circle>
    </IconWrapper>
  )
})

Dot.displayName = "Dot"

export default memo(Dot)
