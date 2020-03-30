import React from "react"

interface TimesIconProps {
  className?: string
  title?: string
  size?: string
  color?: string
}

const pathData = [
  "M4.88059 6.99502L1.33997 3.45439L3.46434 1.33002L7.00497 4.87064L10.5456",
  "1.33002L12.67 3.45439L9.12934 6.99502L12.67 10.5356L10.5456 12.66L7.00497",
  "9.11939L3.46434 12.66L1.33997 10.5356L4.88059 6.99502Z",
].join(" ")

const TimesIcon = ({ className, title, color="black", size="14px" }: TimesIconProps) => {
  return (
    <svg
      className={`qm-icon qm-times-icon ${className || ""}`}
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <title>{ title || "Times, close, or clear symbol" }</title>
      <rect width="14" height="14" fill="transparent"/>
      <path fill={color} d={pathData} />
    </svg>
  )
}

TimesIcon.displayName = "TimesIcon"

export default TimesIcon
