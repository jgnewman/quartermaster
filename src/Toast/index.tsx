import "./styles.styl"
import React, { memo } from "react"

export interface ToastProps {
  className?: string
}

function Toast({
  className,
}: ToastProps) {

  return (
    <div className={`qmToastContainer ${className || ""}`}></div>
  )
}

Toast.displayName = "Toast"

export default memo(Toast)
