import "./styles.styl"
import React, { PureComponent } from "react"

import { DynamicProps } from "../lib/helperTypes"
import { buildClassNames } from "../lib/helpers"

export interface AvatarProps {
  className?: string
  isActive?: boolean
  isCompact?: boolean
  name?: string
  showActivity?: boolean
  url?: string
}

class Avatar extends PureComponent<AvatarProps> {
  static displayName = "Avatar"

  getInitials(rawName: string) {
    const [chunk1, chunk2]: string[] = rawName.split(/\s+/)
    return `${chunk1[0]?.toUpperCase() || ""}${(chunk2 ? chunk2[0] : chunk1[1])?.toUpperCase() || ""}`
  }

  render() {
    const {
      className,
      isActive,
      isCompact,
      name = "••",
      showActivity,
      url,
    } = this.props

    const style: DynamicProps = {}

    if (url) {
      style.backgroundImage = `url(${url})`
    }

    const compactClass = buildClassNames({ isCompact })

    return (
      <div className={`qmAvatarContainer ${compactClass} ${className || ""}`}>
        <span className="qmAvatarContent">
          <span className="qmAvatarInitials">{ this.getInitials(name) }</span>
          {url && <span className="qmAvatarImg" style={style}></span>}
        </span>
        {showActivity && <span className={`qmAvatarIndicator ${compactClass} ${isActive ? "isActive" : ""}`}></span>}
      </div>
    )
  }
}

export default Avatar
