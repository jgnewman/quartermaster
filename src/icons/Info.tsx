import React, {
  Ref,
  forwardRef,
  memo,
} from "react"

import type { IconProps } from "./iconTypes"
import IconWrapper from "./IconWrapper"

const pathData = [
  "M4,8 C1.790861,8 0,6.209139 0,4 C0,1.790861 1.790861,0 4,0 C6.209139,0 8,1.790861",
  "8,4 C8,6.209139 6.209139,8 4,8 Z M4,7 C5.65685425,7 7,5.65685425 7,4 C7,2.34314575",
  "5.65685425,1 4,1 C2.34314575,1 1,2.34314575 1,4 C1,5.65685425 2.34314575,7 4,7 Z",
  "M3.5,5.75 L3.5,3.75 C3.5,3.47385763 3.72385763,3.25 4,3.25 C4.27614237,3.25",
  "4.5,3.47385763 4.5,3.75 L4.5,5.75 C4.5,6.02614237 4.27614237,6.25 4,6.25",
  "C3.72385763,6.25 3.5,6.02614237 3.5,5.75 Z M4,1.75 C4.27614237,1.75 4.5,1.97385763",
  "4.5,2.25 C4.5,2.52614237 4.27614237,2.75 4,2.75 C3.72385763,2.75 3.5,2.52614237",
  "3.5,2.25 C3.5,1.97385763 3.72385763,1.75 4,1.75 Z",
].join(" ")

const Info = forwardRef(function (props: IconProps, ref: Ref<SVGSVGElement>) {
  return (
    <IconWrapper
      {...props}
      disableStroke
      ref={ref}
      title={props.title || "Info icon"}>
      <path className="qmPathIsFilled" d={pathData}></path>
    </IconWrapper>
  )
})

Info.displayName = "Info"

export default memo(Info)
