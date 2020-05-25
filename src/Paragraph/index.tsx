import "./styles.styl"

import React, {
  ReactNode,
  memo,
} from "react"

import Space from "../Space"
import Text from "../Text"

export interface ParagraphProps {
  children?: ReactNode
  className?: string
  isSmaller?: boolean
}

function Paragraph({
  children,
  className,
  isSmaller,
}: ParagraphProps) {

  return (
    <Space
      className={`qmParagraphContainer ${className || ""}`}
      bottom="i">
      <Text
        isBlock
        isSmaller={isSmaller}
        className="qmParagraph"
        tag="p">
        {children}
      </Text>
    </Space>
  )
}

Paragraph.displayName = "Paragraph"

export default memo(Paragraph)
