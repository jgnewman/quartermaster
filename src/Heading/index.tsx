import "./styles.styl"

import React, {
  ReactNode,
  memo,
} from "react"

import Space from "../Space"
import Text from "../Text"

export interface HeadingProps {
  children?: ReactNode
  className?: string
  size: 1 | 2 | 3 | 4 | 5 | 6
  text?: string
}

function Heading({
  children,
  className,
  size,
  text,
}: HeadingProps) {

  return (
    <Space
      className={`qmHeadingContainer ${className || ""}`}
      bottom="i">
      <Text
        isBlock
        isBold
        className={`qmHeading isH${size}`}
        tag={`h${size}`}
        text={text}>
        {children}
      </Text>
    </Space>
  )
}

Heading.displayName = "Heading"

export default memo(Heading)
