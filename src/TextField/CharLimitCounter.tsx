import "./styles.styl"
import React from "react"

import { buildClassNames } from "../lib/helpers"

export interface CharLimitCounterProps {
  className?: string
  count: number
  hideProgressBar?: boolean
  hideText?: boolean
  isTextArea?: boolean
  limit: number
  limitIsMinimum?: boolean
  suffix?: string
}

const CharLimitCounter = ({
  className,
  count,
  hideProgressBar,
  hideText,
  isTextArea,
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

  const limitCountClasses = buildClassNames({
    hasError: colorClass === "error",
    reachedMin: limitIsMinimum && colorClass === "best",
  })

  const fieldClass = isTextArea ? "isTextArea" : "isField"
  const fillWidth = (count / limit) * 100
  const styleWidth = fillWidth > 100 ? "100%" : `${fillWidth}%`

  return (
    <div className={`qmCharLimitContainer ${fieldClass} ${className || ""}`}>

      {!hideText && (
        <span className={`qmCharLimitText ${fieldClass} ${colorClass}`}>
          <span className={`qmCharLimitCount ${limitCountClasses}`}>
            {limitIsMinimum ? (count ? count : "") : (count || "0")}
          </span>
          {!limitIsMinimum && <span className="qmCharLimitDivider"> / </span>}
          {!limitIsMinimum && <span className="qmCharLImitTotal">{limit}{suffix || ""}</span>}
        </span>
      )}

      {!hideProgressBar && (
        <span className={`qmCharLimitBar ${fieldClass}`}>
          <span className={`qmCharLimitBarFill ${colorClass}`} style={{ width: styleWidth }}></span>
        </span>
      )}

    </div>
  )
}

CharLimitCounter.displayName = "CharLimitCounter"

export default CharLimitCounter
