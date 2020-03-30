import React from "react"

import {
  StyledWrapperSpan,
  StyledLeftSpan,
  StyledRightSpan,
} from "./styles"

export interface CaretProps {
  className?: string
}

function Caret({ className }: CaretProps) {
  return (
    <StyledWrapperSpan className={`qm-caret ${className || ""}`}>
      <StyledLeftSpan/>
      <StyledRightSpan/>
    </StyledWrapperSpan>
  )
}

Caret.displayName = "Caret"

export default Caret
