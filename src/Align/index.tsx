import "./styles.styl"

import React, {
  ReactNode,
  memo,
} from "react"

import { buildClassNames } from "../lib/helpers"

import Space, { SpaceSize } from "../Space"

export interface AlignProps {
  children?: ReactNode
  className?: string
  justify?: "left" | "center" | "right"
  bottomSpace?: SpaceSize
  leftSpace?: SpaceSize
  rightSpace?: SpaceSize
  topSpace?: SpaceSize
}

function Align({
  children,
  className,
  justify = "left",
  bottomSpace,
  leftSpace,
  rightSpace,
  topSpace,
}: AlignProps) {

  const childArray = !children ? [] : (Array.isArray(children) ? children : [children])

  const justifyClasses = buildClassNames({
    isCenter: justify === "center",
    isLeft: justify === "left",
    isRight: justify === "right",
  })

  return (
    <Space
      bottom={bottomSpace}
      left={leftSpace}
      right={rightSpace}
      top={topSpace}
      className={`qmAlignContainer ${justifyClasses} ${className || ""}`}>
      {childArray.map((child, index) => (
        <div className="qmAlignItem" key={index}>
          {child}
        </div>
      ))}
    </Space>
  )
}

Align.displayName = "Align"

export default memo(Align)
