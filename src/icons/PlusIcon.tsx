import React from "react"

interface PlusIconProps {
  className?: string
  title?: string
  size?: string
}

const PlusIcon = ({ className, title, size="14px" }: PlusIconProps) => {
  return (
    <svg
      className={`qmIcon qmPlusIcon ${className || ""}`}
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <title>{ title || "Plus" }</title>
      <rect width="14" height="14" fill="transparent"/>
      <path fill="black" d="M5.5 5.5V1H8.5V5.5H13V8.5H8.5V13H5.5V8.5H1V5.5H5.5Z" />
    </svg>
  )
}

PlusIcon.displayName = "PlusIcon"

export default PlusIcon
