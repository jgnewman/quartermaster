import React from "react"

interface CaretIconProps {
  className?: string
  title?: string
  size?: string
}

const pathData = [
  "M13.75 4.61643L11.6375 2.5L6.87918 7.26715L2.3625 2.74208L0.25",
  "4.85851L6.87918 11.5L13.75 4.61643Z",
].join(" ")

const CaretIcon = ({ className, title, size="14px" }: CaretIconProps) => {
  return (
    <svg
      className={`qm-icon qm-caret-icon ${className || ""}`}
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <title>{ title || "Caret" }</title>
      <rect width="14" height="14" fill="transparent"/>
      <path fill="black" d={pathData} />
    </svg>
  )
}

CaretIcon.displayName = "CaretIcon"

export default CaretIcon
