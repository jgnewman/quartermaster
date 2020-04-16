import "./styles.styl"
import React, { PureComponent } from "react"

import { buildClassNames } from "../lib/helpers"

import Space, { SpaceSize } from "../Space"

export interface AlignProps {
  className?: string
  justify?: "left" | "center" | "right"
  bottomSpace?: SpaceSize
  leftSpace?: SpaceSize
  rightSpace?: SpaceSize
  topSpace?: SpaceSize
}

class Align extends PureComponent<AlignProps> {
  static displayName = "Align"

  render() {
    const {
      children,
      className,
      justify = "left",
      bottomSpace,
      leftSpace,
      rightSpace,
      topSpace,
    } = this.props

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
}

export default Align
