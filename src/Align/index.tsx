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
  gutterSpace?: SpaceSize
  leftSpace?: SpaceSize
  rightSpace?: SpaceSize
  topSpace?: SpaceSize
}

function Align({
  children,
  className,
  justify = "left",
  bottomSpace,
  gutterSpace,
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

  const itemClasses = buildClassNames({
    isXS: gutterSpace === "xs",
    isS: gutterSpace === "s",
    isM: gutterSpace === "m",
    isI: gutterSpace === "i",
    isL: gutterSpace === "l",
    isXL: gutterSpace === "xl",
  })

  return (
    <Space
      bottom={bottomSpace}
      left={leftSpace}
      right={rightSpace}
      top={topSpace}
      className={`qmAlignContainer ${justifyClasses} ${className || ""}`}>
      {childArray.map((child, index) => (
        <div className={`qmAlignItem ${itemClasses}`} key={index}>
          {child}
        </div>
      ))}
    </Space>
  )
}

Align.displayName = "Align"

export default memo(Align)
