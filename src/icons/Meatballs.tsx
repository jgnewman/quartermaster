import React, {
  Ref,
  forwardRef,
  memo,
} from "react"

import type { IconProps } from "./types"
import IconWrapper from "./IconWrapper"

const Meatballs = forwardRef(function (props: IconProps, ref: Ref<SVGSVGElement>) {
  return (
    <IconWrapper
     {...props}
      disableStroke
      ref={ref}
      title={props.title || "Meatballs icon"}>
      <circle className="qmPathIsFilled" cx="4" cy="4" r="0.75"></circle>
      <circle className="qmPathIsFilled" cx="0.75" cy="4" r="0.75"></circle>
      <circle className="qmPathIsFilled" cx="7.25" cy="4" r="0.75"></circle>
    </IconWrapper>
  )
})

Meatballs.displayName = "Meatballs"

export default memo(Meatballs)
