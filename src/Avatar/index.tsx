import "./styles.styl"

import React, {
  memo,
  useMemo,
} from "react"

import { DynamicProps } from "../lib/helperTypes"
import { buildClassNames } from "../lib/helpers"

function useInitials(rawName: string) {
  return useMemo(function () {
    const [chunk1, chunk2]: string[] = rawName.split(/\s+/)
    return `${chunk1[0]?.toUpperCase() || ""}${(chunk2 ? chunk2[0] : chunk1[1])?.toUpperCase() || ""}`
  }, [rawName])
}

export interface AvatarProps {
  className?: string
  isActive?: boolean
  isCompact?: boolean
  name?: string
  showActivity?: boolean
  url?: string
}

function Avatar({
  className,
  isActive,
  isCompact,
  name = "••",
  showActivity,
  url,
}: AvatarProps) {

  const style: DynamicProps = {}

  if (url) {
    style.backgroundImage = `url(${url})`
  }

  const initials = useInitials(name)
  const compactClass = buildClassNames({ isCompact })

  return (
    <div className={`qmAvatarContainer ${compactClass} ${className || ""}`}>
      <span className="qmAvatarContent">
        <span className="qmAvatarInitials">{ initials }</span>
        {url && <span className="qmAvatarImg" style={style}></span>}
      </span>
      {showActivity && <span className={`qmAvatarIndicator ${compactClass} ${isActive ? "isActive" : ""}`}></span>}
    </div>
  )

}

Avatar.displayName = "Avatar"

export default memo(Avatar)
