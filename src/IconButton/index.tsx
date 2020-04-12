import "./styles.styl"
import React, { PureComponent } from "react"

import Button from "../Button"
import Icon, {
  IconRotation,
  IconSize,
  IconType,
} from "../Icon"

import { noopEvtHandler } from "../lib/helpers"

export interface IconButtonProps {
  className?: string
  clickHandler?: React.MouseEventHandler
  href?: string
  rotate?: IconRotation
  size: IconSize
  tag?: "a" | "button"
  title?: string
  type: IconType
}

class IconButton extends PureComponent<IconButtonProps> {
  static displayName = "IconButton"

  render() {
    const {
      className = "",
      clickHandler = noopEvtHandler,
      href,
      rotate,
      size,
      tag,
      title,
      type,
    } = this.props

    const containerStyle = {
      fontSize: `${size}px`,
    }

    return (
      <span className={`qmIconButtonContainer ${className}`} style={containerStyle}>
        <span className="qmIconButtonEffect"></span>
        <Button
          className="qmIconButton"
          clickHandler={clickHandler}
          href={href}
          tag={tag}>
          <Icon
            rotate={rotate}
            size={size}
            title={title}
            type={type}
          />
        </Button>
      </span>
    )
  }
}

export default IconButton