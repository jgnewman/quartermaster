import React, {
  Ref,
  forwardRef,
  memo,
} from "react"

import type { IconProps } from "./iconTypes"
import IconWrapper from "./IconWrapper"

const Triangle = forwardRef(function (props: IconProps, ref: Ref<SVGSVGElement>) {
  const pathData = [
    "M1.4267767,2.9267767 C1.3798926,2.8798926 1.35355339,2.81630412 1.35355339,2.75",
    "C1.35355339,2.61192881 1.4654822,2.5 1.60355339,2.5 L6.39644661,2.5",
    "C6.46275073,2.5 6.52633921,2.52633921 6.5732233,2.5732233 C6.67085438,2.67085438",
    "6.67085438,2.82914562 6.5732233,2.9267767 L4.1767767,5.3232233",
    "C4.07914562,5.42085438 3.92085438,5.42085438 3.8232233,5.3232233",
    "L1.4267767,2.9267767 Z",
  ].join(" ")

  return (
    <IconWrapper ref={ref} title={props.title || "Triangle icon"} {...props}>
      <path className="qmPathIsFilled" d={pathData}></path>
      <polygon points="1 2.5 4 5.5 7 2.5"></polygon>
    </IconWrapper>
  )
})

Triangle.displayName = "Triangle"

export default memo(Triangle)
