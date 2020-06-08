import React, {
  Ref,
  forwardRef,
  memo,
} from "react"

import type { IconProps } from "./types"
import IconWrapper from "./IconWrapper"

const Ex = forwardRef(function (props: IconProps, ref: Ref<SVGSVGElement>) {
  return (
    <IconWrapper ref={ref} title={props.title || "Ex icon"} {...props}>
      <path d="M4,0.5 L4,7.5" transform="translate(4, 4) rotate(45) translate(-4, -4)"></path>
      <path d="M4,0.5 L4,7.5" transform="translate(4, 4) rotate(-45) translate(-4, -4)"></path>
    </IconWrapper>
  )
})

Ex.displayName = "Ex"

export default memo(Ex)
