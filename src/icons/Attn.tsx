import React, {
  Ref,
  forwardRef,
  memo,
} from "react"

import type { IconProps } from "./types"
import { radiusMap } from "./helpers"
import IconWrapper from "./IconWrapper"

const Attn = forwardRef(function (props: IconProps, ref: Ref<SVGSVGElement>) {
  const radius = radiusMap[props.size]

  return (
    <IconWrapper
      {...props}
      ref={ref}
      title={props.title || "Attn icon"}>
      <circle className="qmPathIsFilled" stroke="none" cx="4" cy="6" r={radius}></circle>
      <path d="M4,3.5 L4,4.75"></path>
      <polygon points="4 0.5 0.5 7.5 7.5 7.5"></polygon>
    </IconWrapper>
  )
})

Attn.displayName = "Attn"

export default memo(Attn)
