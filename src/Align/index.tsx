import "./styles.styl"
import React, { PureComponent } from "react"

import { buildClassNames } from "../lib/helpers"

export interface AlignProps {
  className?: string
  justify?: "left" | "center" | "right"
}

class Align extends PureComponent<AlignProps> {
  static displayName = "Align"

  render() {
    const {
      children,
      className,
      justify = "left",
    } = this.props

    const childArray = !children ? [] : (Array.isArray(children) ? children : [children])

    const justifyClasses = buildClassNames({
      isCenter: justify === "center",
      isLeft: justify === "left",
      isRight: justify === "right",
    })

    return (
      <div className={`qmAlign ${justifyClasses} ${className || ""}`}>
        {childArray.map((child, index) => (
          <div className="qmAlignItem" key={index}>
            {child}
          </div>
        ))}
      </div>
    )
  }
}

export default Align
