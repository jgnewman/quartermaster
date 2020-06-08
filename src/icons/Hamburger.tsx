import React, {
  Ref,
  forwardRef,
  memo,
} from "react"

import type { IconProps } from "./types"
import IconWrapper from "./IconWrapper"

const Hamburger = forwardRef(function (props: IconProps, ref: Ref<SVGSVGElement>) {
  return (
    <IconWrapper ref={ref} title={props.title || "Hamburger icon"} {...props}>
      <path d="M4,0.5 L4,7.5" transform="translate(4, 4) rotate(-90) translate(-4, -4)"></path>
      <path d="M4,-2 L4,5" transform="translate(4, 1.5) rotate(-90) translate(-4, -1.5)"></path>
      <path d="M4,3 L4,10" transform="translate(4, 6.5) rotate(-90) translate(-4, -6.5)"></path>
    </IconWrapper>
  )
})

Hamburger.displayName = "Hamburger"

export default memo(Hamburger)
