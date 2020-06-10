import "./styles.styl"

import React, {
  ReactNode,
  memo,
} from "react"

import { buildClassNames } from "../lib/helpers"
import Space, { SpaceSize } from "../Space"

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

export type GutterSize = "xs" | "s" | "m" | "i" | "l" | "xl"

export interface GridProps {
  children?: ReactNode
  className?: string
  gutterH?: GutterSize
  gutterW?: GutterSize
  justify?: "start" | "end" | "center" | "even" | "between" | "around"
  equalHeight?: boolean
  wrap?: boolean
  bottomSpace?: SpaceSize
  leftSpace?: SpaceSize
  rightSpace?: SpaceSize
  topSpace?: SpaceSize
}

function Grid({
  bottomSpace,
  children,
  className,
  equalHeight,
  gutterH,
  gutterW,
  justify = "between",
  leftSpace,
  rightSpace,
  topSpace,
  wrap,
}: GridProps) {

  const containerClasses = buildClassNames({
    hasWrap: wrap,
    isAround: justify === "around",
    isBetween: justify === "between",
    isCenter: justify === "center",
    isEnd: justify === "end",
    isEven: justify === "even",
    isGutterHXL: gutterH === "xl",
    isGutterHL: gutterH === "l",
    isGutterHI: gutterH === "i",
    isGutterHM: gutterH === "m",
    isGutterHS: gutterH === "s",
    isGutterHXS: gutterH === "xs",
    isGutterWXL: gutterW === "xl",
    isGutterWL: gutterW === "l",
    isGutterWI: gutterW === "i",
    isGutterWM: gutterW === "m",
    isGutterWS: gutterW === "s",
    isGutterWXS: gutterW === "xs",
    isStart: justify === "start",
    isStretch: equalHeight,
  })

  return (
    <Space
      bottom={bottomSpace}
      left={leftSpace}
      right={rightSpace}
      top={topSpace}
      className="qmGridSpacer">
      <div className={`qmGridContainer ${containerClasses} ${className || ""}`}>
        {children}
      </div>
    </Space>
  )
}

Grid.displayName = "Grid"

export default memo(Grid)
