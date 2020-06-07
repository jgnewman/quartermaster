import React, {
  Ref,
  forwardRef,
  memo,
} from "react"

import type { IconProps } from "./iconTypes"
import IconWrapper from "./IconWrapper"

const pathData = [
  "M1.75,7.13 C0.75,6.34823973 0.25,5.38823973 0.25,4.25 C0.25,2.5426404",
  "1.60526021,0.75 3.75,0.75 C5.89473979,0.75 7.25,2.5564157 7.25,4.25",
  "C7.25,5.9435843 6.25,6.75 5.59,7.25",
].join(" ")

const Reload = forwardRef(function (props: IconProps, ref: Ref<SVGSVGElement>) {
  return (
    <IconWrapper ref={ref} title={props.title || "Reload icon"} {...props}>
      <path
        d={pathData}
        transform="translate(3.750000, 4.000000) rotate(-90.000000) translate(-3.750000, -4.000000)"
      ></path>
      <polyline points="7.5 0.5 7.5 2.5 5.5 2.5"></polyline>
    </IconWrapper>
  )
})

Reload.displayName = "Reload"

export default memo(Reload)
