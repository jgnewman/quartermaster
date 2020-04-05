import React from "react"

interface DotIconProps {
  className?: string
  title?: string
  size?: string
}

const DotIcon = ({ className, title, size="14px" }: DotIconProps) => {
  return (
    <svg
      className={`qmIcon qmDotIcon ${className || ""}`}
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <title>{ title || "Dot" }</title>
      <rect width="14" height="14" fill="transparent"/>
      <circle cx="7" cy="7" r="3" fill="black"/>
    </svg>
  )
}

DotIcon.displayName = "DotIcon"

export default DotIcon
