import React, {
  Ref,
  forwardRef,
  memo,
} from "react"

import type { IconProps } from "./iconTypes"
import IconWrapper from "./IconWrapper"

const pathData = [
  "M2.2,6.4 C1.4,5.78343913 1,4.98343913 1,4 C1,2.52484131 2.16165161,1 4,1",
  "C5.83834839,1 7,2.53674316 7,4 C7,4.97550456 6.59838867,5.77550456 5.79516602,6.4",
].join(" ")

const Reload = forwardRef(function (props: IconProps, ref: Ref<SVGSVGElement>) {
  return (
    <IconWrapper ref={ref} title={props.title || "Reload icon"} {...props}>
      <path d={pathData}></path>
      <polyline
        transform="translate(5.690990, 6.340990) rotate(45.000000) translate(-5.690990, -6.340990)"
        points="4.19099026 5.59099026 5.69099026 7.09099026 7.19099026 5.59099026"
      ></polyline>
    </IconWrapper>
  )
})

Reload.displayName = "Reload"

export default memo(Reload)
