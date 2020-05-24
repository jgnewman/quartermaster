import React, {
  Ref,
  forwardRef,
  memo,
} from "react"

import type { IconProps } from "./iconTypes"
import IconWrapper from "./IconWrapper"

const Ex = forwardRef(function (props: IconProps, ref: Ref<SVGSVGElement>) {
  return (
    <IconWrapper ref={ref} title={props.title || "Ex icon"} {...props}>
      <path
        d="M4,0.464466094 L4,7.53553391"
        transform="translate(4.000000, 4.000000) rotate(45.000000) translate(-4.000000, -4.000000) ">
      </path>
      <path
        d="M4,0.464466094 L4,7.53553391"
        transform="translate(4.000000, 4.000000) rotate(-45.000000) translate(-4.000000, -4.000000) ">
      </path>
    </IconWrapper>
  )
})

Ex.displayName = "Ex"

export default memo(Ex)
