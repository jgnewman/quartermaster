import React from "react"

import {
  StyledWrapperSpan,
  StyledLongEdgeSpan,
  StyledShortEdgeSpan,
} from "./styles"

export interface CheckmarkProps {
  className?: string
}

function Checkmark({ className }: CheckmarkProps) {
  return (
    <StyledWrapperSpan className={`qm-checkmark ${className || ""}`}>
      <StyledLongEdgeSpan/>
      <StyledShortEdgeSpan/>
    </StyledWrapperSpan>
  )
}

Checkmark.displayName = "Checkmark"

export default Checkmark
