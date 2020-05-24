import React, {
  Ref,
  forwardRef,
  memo,
} from "react"

import type { IconProps } from "./iconTypes"
import IconWrapper from "./IconWrapper"

const Caret = forwardRef(function (props: IconProps, ref: Ref<SVGSVGElement>) {
  return (
    <IconWrapper ref={ref} title={props.title || "Caret icon"} {...props}>
      <polyline points="1 2.5 4 5.5 7 2.5"></polyline>
    </IconWrapper>
  )
})

Caret.displayName = "Caret"

export default memo(Caret)
