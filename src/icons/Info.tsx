import React, {
  Ref,
  forwardRef,
  memo,
} from "react"

import type { IconProps } from "./iconTypes"
import { radiusMap } from "./iconHelpers"
import IconWrapper from "./IconWrapper"

const Info = forwardRef(function (props: IconProps, ref: Ref<SVGSVGElement>) {
  const radius = radiusMap[props.size]

  return (
    <IconWrapper
      {...props}
      ref={ref}
      title={props.title || "Info icon"}>
      <path d="M4,3.75 L4,5.75"></path>
      <circle cx="4" cy="4" r="3.5"></circle>
      <circle className="qmPathIsFilled" stroke="none" cx="4" cy="2.25" r={radius}></circle>
    </IconWrapper>
  )
})

Info.displayName = "Info"

export default memo(Info)
