import React from "react"

import SmileIcon from "../icons/SmileIcon"
import {
  StyledAvatarSpan,
  StyledActivitySpan,
  StyledAvatarContentSpan,
} from "./styles"

interface AvatarProps {
  className?: string
  url?: string
  showActivity?: boolean
  isActive?: boolean
}

interface DynamicProps {
  [key: string]: unknown
}

function Avatar({
  className,
  url,
  showActivity,
  isActive,
}: AvatarProps) {

  const style: DynamicProps = {}

  if (url) {
    style.backgroundImage = `url(${url})`
  }

  return (
    <StyledAvatarSpan className={`qm-avatar ${className || ""}`}>

      <StyledAvatarContentSpan className="qm-avatar-content" style={style}>
        {!url && (
          <SmileIcon className="qm-avatar-default-img" />
        )}
      </StyledAvatarContentSpan>

      {showActivity && (
        <StyledActivitySpan
          className={`qm-avatar-activity ${isActive ? "is-active" : ""}`}
          isActive={!!isActive}
        />
      )}

    </StyledAvatarSpan>
  )
}

Avatar.displayName = "Avatar"

export default Avatar
