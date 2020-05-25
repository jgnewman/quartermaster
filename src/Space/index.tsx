import "./styles.styl"

import React, {
  ReactNode,
  memo,
} from "react"

const sizeMap = {
  xs: "0.25em",
  s: "0.5em",
  m: "0.75em",
  i: "1em",
  l: "1.5em",
  xl: "2em",
}

export type SpaceSize = "xs" | "s" | "m" | "i" | "l" | "xl"

export interface SpaceProps {
  children?: ReactNode
  className?: string
  bottom?: SpaceSize
  left?: SpaceSize
  right?: SpaceSize
  top?: SpaceSize
}

function Space({
  children,
  className,
  bottom,
  left,
  right,
  top,
}: SpaceProps) {

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

Space.displayName = "Space"

export default memo(Space)
