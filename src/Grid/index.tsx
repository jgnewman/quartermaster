import "./styles.styl"

import React, {
  ReactNode,
  memo,
} from "react"

import { buildClassNames } from "../lib/helpers"

// TODO: Allow user to control gutter spacing (vert & horiz)

export interface GrowProps {
  children?: ReactNode
  className?: string
  size: 0 | 1 | 2 | 3
}

export const Grow = memo(function ({
  children,
  className,
  size,
}: GrowProps) {

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
})

Grow.displayName = "Grow"

export interface GridProps {
  children?: ReactNode
  className?: string
  justify?: "start" | "end" | "center" | "even" | "between" | "around"
  equalHeight?: boolean
  wrap?: boolean
}

function Grid({
  children,
  className,
  justify = "between",
  equalHeight,
  wrap,
}: GridProps) {

  const containerClasses = buildClassNames({
    hasWrap: wrap,
    isAround: justify === "around",
    isBetween: justify === "between",
    isCenter: justify === "center",
    isEnd: justify === "end",
    isEven: justify === "even",
    isStart: justify === "start",
    isStretch: equalHeight,
  })

  return (
    <div className={`qmGridContainer ${containerClasses} ${className || ""}`}>
      {children}
    </div>
  )
}

Grid.displayName = "Grid"

export default memo(Grid)
