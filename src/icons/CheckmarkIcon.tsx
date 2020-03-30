import React from "react"

interface CheckmarkIconProps {
  className?: string
  title?: string
  size?: string
}

const pathData = [
  "M13.75 3.61731L11.6375 1.5L4.8875 8.26537L2.3625 5.73463L0.25",
  "7.85194L4.8875 12.5L13.75 3.61731Z",
].join(" ")

const CheckmarkIcon = ({ className, title, size="14px" }: CheckmarkIconProps) => {
  return (
    <svg
      className={`qm-icon qm-checkmark-icon ${className || ""}`}
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <title>{ title || "Checkmark" }</title>
      <rect width="14" height="14" fill="transparent"/>
      <path fill="black" d={pathData} />
    </svg>
  )
}

CheckmarkIcon.displayName = "CheckmarkIcon"

export default CheckmarkIcon
