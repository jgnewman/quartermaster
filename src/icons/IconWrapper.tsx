import "./styles.styl"
import React, {
  ReactNode,
  Ref,
  forwardRef,
  memo,
} from "react"

import { sizeMap, strokeMap } from "./iconHelpers"
import type { IconProps } from "./iconTypes"

interface SVGStyle {
  transform?: string
  width: string
  height: string
}

export interface IconWrapperProps extends IconProps {
  children?: ReactNode
  disableStroke?: boolean
}

const IconWrapper = forwardRef(function ({
  children,
  className = "",
  disableStroke,
  rotate,
  size,
  title,
}: IconWrapperProps, ref: Ref<SVGSVGElement>) {

  const pxSize = sizeMap[size]
  const strokeWidth = strokeMap[size]

  const svgStyle: SVGStyle = {
    width: `${pxSize}px`,
    height: `${pxSize}px`,
  }

  if (rotate) {
    svgStyle.transform = `rotate(${rotate || 0}deg)`
  }

  return (
    <svg
      className={`qmIcon isSize${size.toUpperCase()} ${disableStroke ? "isNoStroke" : ""} ${className}`}
      style={svgStyle}
      width={pxSize}
      height={pxSize}
      viewBox="0 0 8 8"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      stroke="inherit"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      ref={ref}>
      <title>{title || "SVG Icon"}</title>
      <rect fill="transparent" strokeWidth="0" x="0" y="0" width="8" height="8"></rect>
      { children }
    </svg>
  )
})

IconWrapper.displayName = "Plus"

export default memo(IconWrapper)
