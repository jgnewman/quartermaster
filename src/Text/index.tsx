import "./styles.styl"
import React, {
  ReactNode,
  memo,
} from "react"

export interface TextProps {
  children?: ReactNode
  className?: string
}

function Text({
  children,
  className,
}: TextProps) {

  return (
    <span className={`qmTextContainer ${className || ""}`}>
      {children}
    </span>
  )
}

Text.displayName = "Text"

export default memo(Text)
