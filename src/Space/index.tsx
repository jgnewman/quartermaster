import "./styles.styl"
import React, { PureComponent } from "react"

const sizeMap = {
  xs: "0.25rem",
  s: "0.5rem",
  m: "1rem",
  l: "1.5rem",
}

export type SpaceSize = "xs" | "s" | "m" | "l"

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

    const style = {
      paddingTop: top ? sizeMap[top] : 0,
      paddingRight: right ? sizeMap[right] : 0,
      paddingBottom: bottom ? sizeMap[bottom] : 0,
      paddingLeft: left ? sizeMap[left] : 0,
    }

    return (
      <div className={`qmSpaceContainer ${className || ""}`} style={style}>
        {children}
      </div>
    )
  }
}

export default Space
