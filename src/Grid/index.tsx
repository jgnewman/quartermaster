import "./styles.styl"
import React, { PureComponent } from "react"

import { buildClassNames } from "../lib/helpers"

export interface GrowProps {
  className?: string
  size: 0 | 1 | 2 | 3
}

export class Grow extends PureComponent<GrowProps> {
  static displayName = "Grow"

  render() {
    const {
      children,
      className,
      size,
    } = this.props

    const containerClasses = buildClassNames({
      isStatic: size === 0,
      isSingle: size === 1,
      isDouble: size === 2,
      isTriple: size === 3,
    })

    return (
      <div className={`qmGrowContainer ${containerClasses} ${className || ""}`}>
        {children}
      </div>
    )
  }
}

export interface GridProps {
  className?: string
  justify?: "start" | "end" | "center" | "even" | "between" | "around"
  wrap?: boolean
}

export default class Grid extends PureComponent<GridProps> {
  static displayName = "Grid"

  render() {
    const {
      children,
      className,
      justify = "between",
      wrap,
    } = this.props

    const containerClasses = buildClassNames({
      hasWrap: wrap,
      isAround: justify === "around",
      isBetween: justify === "between",
      isCenter: justify === "center",
      isEnd: justify === "end",
      isEven: justify === "even",
      isStart: justify === "start",
    })

    return (
      <div className={`qmGridContainer ${containerClasses} ${className || ""}`}>
        {children}
      </div>
    )
  }
}
