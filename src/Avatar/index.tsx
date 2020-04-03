import React from "react"

import SmileIcon from "../icons/SmileIcon"
import { DynamicProps } from "../lib/helperTypes"

import {
  SpanActivityIndicator,
  SpanAvatarContainer,
  SpanAvatarContent,
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
    <SpanAvatarContainer className={`qm-avatar ${className || ""}`}>

      <SpanAvatarContent className="qm-avatar-content" style={style}>
        {!url && (
          <SmileIcon className="qm-avatar-default-img" />
        )}
      </SpanAvatarContent>

      {showActivity && (
        <SpanActivityIndicator
          className={`qm-avatar-activity ${isActive ? "is-active" : ""}`}
          isActive={!!isActive}
        />
      )}

    </SpanAvatarContainer>
  )
}

Avatar.displayName = "Avatar"

export default Avatar
