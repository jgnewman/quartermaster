import React from "react"

import {
  StyledWrapperSpan,
  StyledVerticalSpan,
  StyledHorizontalSpan,
} from "./styles"

export interface PlusProps {
  className?: string
}

function Plus({ className }: PlusProps) {
  return (
    <StyledWrapperSpan className={`qm-plus ${className || ""}`}>
      <StyledVerticalSpan/>
      <StyledHorizontalSpan/>
    </StyledWrapperSpan>
  )
}

Plus.displayName = "Plus"

export default Plus
