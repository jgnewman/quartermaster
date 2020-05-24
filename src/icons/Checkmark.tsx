import React, {
  Ref,
  forwardRef,
  memo,
} from "react"

import type { IconProps } from "./iconTypes"
import IconWrapper from "./IconWrapper"

const Checkmark = forwardRef(function (props: IconProps, ref: Ref<SVGSVGElement>) {
  return (
    <IconWrapper ref={ref} title={props.title || "Checkmark icon"} {...props}>
      <polyline points="1 4.25 3 6.5 7 1.5"></polyline>
    </IconWrapper>
  )
})

Checkmark.displayName = "Checkmark"

export default memo(Checkmark)
