import React, {
  Ref,
  forwardRef,
  memo,
} from "react"

import type { IconProps } from "./types"
import IconWrapper from "./IconWrapper"

const Err = forwardRef(function (props: IconProps, ref: Ref<SVGSVGElement>) {
  return (
    <IconWrapper ref={ref} title={props.title || "Err icon"} {...props}>
      <circle cx="4" cy="4" r="3.5"></circle>
      <path d="M4,2 L4,6" transform="translate(4, 4) rotate(45) translate(-4, -4)"></path>
      <path d="M4,2 L4,6" transform="translate(4, 4) rotate(-45) translate(-4, -4)"></path>
    </IconWrapper>
  )
})

Err.displayName = "Err"

export default memo(Err)
