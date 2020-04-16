import "./styles.styl"
import React, { PureComponent } from "react"

import { DynamicProps } from "../lib/helperTypes"

export type SpaceSize = "s" | "m" | "l"

export interface SpaceProps {
  className?: string
  bottom?: SpaceSize
  left?: SpaceSize
  right?: SpaceSize
  top?: SpaceSize
}

class Space extends PureComponent<SpaceProps> {
  static displayName = "Space"

  render() {
    const {
      children,
      className,
      bottom,
      left,
      right,
      top,
    } = this.props

    const sizeMap = {
      s: "0.5rem",
      m: "1rem",
      l: "1.5rem",
    }

    const style: DynamicProps = {}

    if (top) {
      style.paddingTop = sizeMap[top]
    }

    if (right) {
      style.paddingRight = sizeMap[right]
    }

    if (bottom) {
      style.paddingBottom = sizeMap[bottom]
    }

    if (left) {
      style.paddingLeft = sizeMap[left]
    }

    return (
      <div className={`qmSpaceContainer ${className || ""}`} style={style}>
        {children}
      </div>
    )
  }
}

export default Space
