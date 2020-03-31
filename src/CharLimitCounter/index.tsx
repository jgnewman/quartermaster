import React from "react"

import {
  StyledWrapperDiv,
  StyledCounterBarSpan,
  StyledFillBarSpan,
} from "./styles"

export interface CharLimitCounterProps {
  className?: string
  count: number
  hideProgressBar?: boolean
  hideText?: boolean
  limit: number
  limitIsMinimum?: boolean
  suffix?: string
}

const CharLimitCounter = ({
  className,
  count,
  hideProgressBar,
  hideText,
  limit,
  limitIsMinimum,
  suffix,
}: CharLimitCounterProps) => {

  const quarterMark = Math.round(limit / 4)
  const halfMark = Math.round(limit / 2)
  const threeQuarterMark = quarterMark * 3

  let colorClass: string

  if (limitIsMinimum) {

    if (count === 0) {
      colorClass = "empty"
    } else if (count < quarterMark) {
      colorClass = "worst"
    } else if (count < halfMark) {
      colorClass = "worse"
    } else if (count < threeQuarterMark) {
      colorClass = "decent"
    } else if (count < limit) {
      colorClass = "better"
    } else {
      colorClass = "best"
    }

  } else {

    if (count === 0) {
      colorClass = "empty"
    } else if (count < quarterMark) {
      colorClass = "best"
    } else if (count < halfMark) {
      colorClass = "better"
    } else if (count < threeQuarterMark) {
      colorClass = "decent"
    } else if (count <= limit) {
      colorClass = "worse"
    } else {
      colorClass = "error"
    }

  }

  const fillWidth = (count / limit) * 100
  const styleWidth = fillWidth > 100 ? "100%" : `${fillWidth}%`

  return (
    <StyledWrapperDiv className={`qm-char-limit-counter ${colorClass} ${className || ""}`}>
      {!hideText && (
        <span className="qm-char-limit-counter-text">
          <span className="qm-char-limit-count">
            {count || "0"}
          </span>
          <span className="qm-char-limit-divider"> / </span>
          <span className="qm-char-limit-total">
            {limit}{suffix || ""}
          </span>
        </span>
      )}
      {!hideProgressBar && (
        <StyledCounterBarSpan className="qm-char-limit-counter-bar">
          <StyledFillBarSpan className={`qm-char-limit-counter-bar-fill ${colorClass}`} width={styleWidth} />
        </StyledCounterBarSpan>
      )}
    </StyledWrapperDiv>
  )
}

CharLimitCounter.displayName = "CharLimitCounter"

export default CharLimitCounter
