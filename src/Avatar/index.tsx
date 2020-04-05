import "./styles.styl"
import React from "react"

import SmileIcon from "../icons/SmileIcon"
import { DynamicProps } from "../lib/helperTypes"

export interface AvatarProps {
  className?: string
  isActive?: boolean
  showActivity?: boolean
  url?: string
}

function Avatar({
  className,
  isActive,
  showActivity,
  url,
}: AvatarProps) {

  const style: DynamicProps = {}

  if (url) {
    style.backgroundImage = `url(${url})`
  }

  return (
    <span className={`qmAvatarContainer ${className || ""}`}>
      <span className="qmAvatarContent" style={style}>
        {!url && <SmileIcon className="qmAvatarDefaultImg" />}
      </span>
      {showActivity && <span className={`qmAvatarIndicator ${isActive ? "isActive" : ""}`}></span>}
    </span>
  )
}

Avatar.displayName = "Avatar"

export default Avatar
