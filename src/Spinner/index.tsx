import "./styles.styl"
import React, { PureComponent } from "react"

import sizeMap from "../Icon/sizeMap"
import type { IconSize } from "../Icon"

export interface SpinnerProps {
  className?: string
  size: IconSize
}

class Spinner extends PureComponent<SpinnerProps> {
  static displayName = "Spinner"

  render() {
    const {
      className,
      size = "xxs",
    } = this.props

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
}

export default Spinner
