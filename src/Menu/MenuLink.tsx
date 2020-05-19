import React, {
  MouseEventHandler,
  memo,
} from "react"

import { DynamicProps } from "../lib/helperTypes"
import { buildClassNames } from "../lib/helpers"

import Icon from "../Icon"
import Space from "../Space"

export interface MenuLinkProps {
  clickHandler?: MouseEventHandler
  component?: Function
  href?: string
  isActive?: boolean
  isCompact?: boolean
  text: string
}

function MenuLink({
  clickHandler,
  component: CustomComponent,
  href,
  isActive,
  isCompact,
  text,
}: MenuLinkProps) {

  const smallPad = isCompact ? "xs" : "s"
  const largePad = isCompact ? "m" : "l"

  const linkAttrs: DynamicProps = {
    className: "qmMenuLink",
  }

  if (clickHandler) {
    linkAttrs.onClick = clickHandler
  }

  if (href) {
    linkAttrs.href = href
  }

  const iconClasses = buildClassNames({ isCompact })

  const content = (
    <Space
      className="qmMenuLinkContent"
      top={smallPad}
      right={largePad}
      bottom={smallPad}
      left={largePad}>

      <span className="qmMenuLinkText">
        {text}
      </span>

      {isActive && (
        <Icon
          className={`qmMenuActiveIcon ${iconClasses}`}
          type="dot"
          size="xs"
        />
      )}
    </Space>
  )

  return CustomComponent
    ? <CustomComponent {...linkAttrs}>{content}</CustomComponent>
    : <a {...linkAttrs}>{content}</a>
}

MenuLink.displayName = "MenuLink"

export default memo(MenuLink)
