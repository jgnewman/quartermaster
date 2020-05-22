import React, { memo } from "react"

import Space from "../Space"

export interface MenuSeparatorProps {
  isCompact?: boolean
}

function MenuSeparator({ isCompact }: MenuSeparatorProps) {
  const paddingSize = isCompact ? "xs" : "s"

  return (
    <Space
      className="qmMenuSeparatorWrapper"
      bottom={paddingSize}>
      <hr className="qmMenuSeparator" />
    </Space>
  )
}

MenuSeparator.displayName = "MenuSeparator"

export default memo(MenuSeparator)
