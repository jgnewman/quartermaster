import React from "react"

import SmileIcon from "../icons/SmileIcon"
import { DynamicProps } from "../lib/helperTypes"

import {
  StyledAvatarSpan,
  StyledActivitySpan,
  StyledAvatarContentSpan,
} from "./styles"

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
