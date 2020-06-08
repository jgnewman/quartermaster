import React, {
  Ref,
  forwardRef,
  memo,
} from "react"

import type { IconProps } from "./types"
import IconWrapper from "./IconWrapper"

const Plus = forwardRef(function (props: IconProps, ref: Ref<SVGSVGElement>) {
  const pathTransform = "translate(4.000000, 4.000000) rotate(-90.000000) translate(-4.000000, -4.000000)"

  return (
    <IconWrapper ref={ref} title={props.title || "Plus icon"} {...props}>
      <path d="M4,1 L4,7"></path>
      <path d="M4,1 L4,7" transform={pathTransform}></path>
    </IconWrapper>
  )
})

Plus.displayName = "Plus"

export default memo(Plus)
