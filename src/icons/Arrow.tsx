import React, {
  Ref,
  forwardRef,
  memo,
} from "react"

import type { IconProps } from "./types"
import IconWrapper from "./IconWrapper"

const Arrow = forwardRef(function (props: IconProps, ref: Ref<SVGSVGElement>) {
  return (
    <IconWrapper ref={ref} title={props.title || "Arrow icon"} {...props}>
      <polyline points="3.5 1.5 1 4 3.5 6.5"></polyline>
      <path d="M1,4 L6.75,4"></path>
    </IconWrapper>
  )
})

Arrow.displayName = "Arrow"

export default memo(Arrow)
