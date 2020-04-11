import "./styles.styl"
import React, { PureComponent } from "react"

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
      size = 8,
    } = this.props

    const borderWidth = size > 24 ? 3 : size > 10 ? 2 : 1

    const spinnerStyle = {
      width: `${size}px`,
      height: `${size}px`,
      borderWidth: `${borderWidth}px`,
    }

    return (
      <span className={`qmSpinnerContainer ${className || ""}`} style={spinnerStyle}></span>
    )
  }
}

export default Spinner
