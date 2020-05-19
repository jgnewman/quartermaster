import "./styles.styl"
import React, { memo } from "react"

export interface DropdownProps {
  className?: string
}

function Dropdown({ className }: DropdownProps) {
  return (
    <div className={`qmDropdownContainer ${className || ""}`}></div>
  )
}

Dropdown.displayName = "Dropdown"

export default memo(Dropdown)
