import "./styles.styl"
import React, { memo } from "react"

import sizeMap from "../Icon/sizeMap"
import type { IconSize } from "../Icon"

export interface SpinnerProps {
  className?: string
  size: IconSize
}

function Spinner({
  className,
  size = "xxs",
}: SpinnerProps) {

  const pxSize = sizeMap[size]
  let borderWidth: number

  switch (size) {

    case "xxs":
    case "xs":
      borderWidth = 1
      break

    case "s":
    case "m":
    case "i":
    case "l":
      borderWidth = 2
      break

    case "xl":
    case "xxl":
    default:
      borderWidth = 3

  }

  const spinnerStyle = {
    width: `${pxSize}px`,
    height: `${pxSize}px`,
    borderWidth: `${borderWidth}px`,
  }

  return (
    <span className={`qmSpinnerContainer ${className || ""}`} style={spinnerStyle}></span>
  )

}

Spinner.displayName = "Spinner"

export default memo(Spinner)
