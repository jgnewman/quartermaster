import React, { memo } from "react"

import Label from "../Label"
import Space from "../Space"

export interface MenuLabelProps {
  isCompact?: boolean
  text: string
}

function MenuLabel({ isCompact, text }: MenuLabelProps) {
  const largePad = isCompact ? "m" : "l"
  const smallPad = isCompact ? "xs" : "s"

  return (
    <Space
      className="qmMenuLabelWrapper"
      bottom={smallPad}
      right={largePad}
      left={largePad}>
      <Label className="qmMenuLabel" text={text} />
    </Space>
  )
}

MenuLabel.displayName = "MenuLabel"

export default memo(MenuLabel)
