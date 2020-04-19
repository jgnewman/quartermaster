import "./styles.styl"
import React, { PureComponent } from "react"

import { DynamicProps } from "../lib/helperTypes"
import { buildClassNames } from "../lib/helpers"

import Icon from "../Icon"
import Label from "../Label"
import Space from "../Space"

interface LabelData {
  text: string
  type: "label"
}

interface LinkData {
  clickHandler?: React.MouseEventHandler
  href?: string
  isActive?: boolean
  text: string
  type: "link"
}

interface SeparatorData {
  type: "separator"
}

type Data = LabelData | LinkData | SeparatorData

export interface MenuProps {
  className?: string
  data: Data[]
  isCompact?: boolean
  isLifted?: boolean
  maxWidth?: string
  minWidth?: string
}

class Menu extends PureComponent<MenuProps> {
  static displayName = "Menu"

  buildLabel({ text }: LabelData, key: number) {
    const { isCompact } = this.props
    const largePad = isCompact ? "m" : "l"
    const smallPad = isCompact ? "xs" : "s"

    return (
      <Space
        key={key}
        className="qmMenuLabelWrapper"
        bottom={smallPad}
        right={largePad}
        left={largePad}>
        <Label className="qmMenuLabel" text={text} />
      </Space>
    )
  }

  buildLink({ clickHandler, href, text, isActive }: LinkData, key: number) {
    const { isCompact } = this.props
    const smallPad = isCompact ? "xs" : "s"
    const largePad = isCompact ? "m" : "l"

    const linkAttrs: DynamicProps = {}

    if (clickHandler) {
      linkAttrs.onClick = clickHandler
    }

    if (href) {
      linkAttrs.href = href
    }

    const iconClasses = buildClassNames({ isCompact })

    return (
      <a key={key} className="qmMenuLink" {...linkAttrs}>
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
      </a>
    )
  }

  buildSeparator(_: SeparatorData, key: number) {
    const { isCompact } = this.props
    const paddingSize = isCompact ? "xs" : "s"

    return (
      <Space
        key={key}
        className="qmMenuSeparatorWrapper"
        bottom={paddingSize}>
        <hr className="qmMenuSeparator" />
      </Space>
    )
  }

  buildMenuItem(data: Data, key: number) {
    switch (data.type) {

      case "label":
        return this.buildLabel(data, key)

      case "link":
        return this.buildLink(data, key)

      case "separator":
      default:
        return this.buildSeparator(data, key)

    }
  }

  render() {
    const {
      className,
      data,
      isCompact,
      isLifted,
      minWidth,
      maxWidth,
    } = this.props

    const style = {
      minWidth: minWidth || "initial",
      maxWidth: maxWidth || "initial",
    }

    const helperClasses = buildClassNames({
      isCompact,
      isLifted,
    })

    return (
      <div className={`qmMenuContainer ${helperClasses} ${className || ""}`} style={style}>
        {data.map((item, index) => this.buildMenuItem(item, index))}
      </div>
    )
  }
}

export default Menu
