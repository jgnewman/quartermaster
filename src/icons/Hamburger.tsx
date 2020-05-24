import React, {
  Ref,
  forwardRef,
  memo,
} from "react"

import type { IconProps } from "./iconTypes"
import IconWrapper from "./IconWrapper"

const Hamburger = forwardRef(function (props: IconProps, ref: Ref<SVGSVGElement>) {
  return (
    <IconWrapper ref={ref} title={props.title || "Hamburger icon"} {...props}>
      <path
        d="M4,0.5 L4,7.5"
        transform="translate(4.000000, 4.000000) rotate(-90.000000) translate(-4.000000, -4.000000)">
      </path>
      <path
        d="M4,-2 L4,5"
        transform="translate(4.000000, 1.500000) rotate(-90.000000) translate(-4.000000, -1.500000)">
      </path>
      <path
        d="M4,3 L4,10"
        transform="translate(4.000000, 6.500000) rotate(-90.000000) translate(-4.000000, -6.500000)">
      </path>
    </IconWrapper>
  )
})

Hamburger.displayName = "Hamburger"

export default memo(Hamburger)
