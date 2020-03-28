import React from "react"

export interface CharLimitCounterProps {
  className?: string
  limit: number
  count: number
  limitIsMinimum?: boolean
  hideText?: boolean
  suffix?: string
}

const CharLimitCounter = ({
  className,
  limit,
  count,
  limitIsMinimum,
  hideText,
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
  const style = {
    width: fillWidth > 100 ? "100%" : `${fillWidth}%`,
  }

  return (
    <div className={`qm-char-limit-counter ${colorClass} ${className || ""}`}>
      {!hideText && (
        <span className="qm-char-limit-counter-text">
          <span className="qm-char-limit-current-count">{count || "0"}</span> / {limit} {suffix || ""}
        </span>
      )}
      <span className="qm-char-limit-counter-bar">
        <span
          className="qm-char-limit-counter-bar-fill"
          style={style}>
        </span>
      </span>
    </div>
  )
}

CharLimitCounter.displayName = "CharLimitCounter"

export default CharLimitCounter
