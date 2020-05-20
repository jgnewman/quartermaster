import "./styles.styl"
import React, {
  MouseEventHandler,
  MutableRefObject,
  forwardRef,
  memo,
} from "react"

import Button from "../Button"
import sizeMap from "../Icon/sizeMap"

import Icon, {
  IconRotation,
  IconSize,
  IconType,
} from "../Icon"

import { noopEvtHandler } from "../lib/helpers"

export interface IconButtonProps {
  className?: string
  clickHandler?: MouseEventHandler
  href?: string
  rotate?: IconRotation
  size: IconSize
  tag?: "a" | "button"
  title?: string
  type: IconType
}

const IconButton = forwardRef(function ({
  className = "",
  clickHandler = noopEvtHandler,
  href,
  rotate,
  size,
  tag,
  title,
  type,
}: IconButtonProps, ref: MutableRefObject<HTMLAnchorElement | HTMLButtonElement>) {

  const containerStyle = {
    fontSize: `${sizeMap[size]}px`,
  }

  return (
    <span className={`qmIconButtonContainer ${className}`} style={containerStyle}>
      <span className="qmIconButtonEffect"></span>
      <Button
        className="qmIconButton"
        clickHandler={clickHandler}
        href={href}
        tag={tag}
        ref={ref}>
        <Icon
          rotate={rotate}
          size={size}
          title={title}
          type={type}
        />
      </Button>
    </span>
  )
})

IconButton.displayName = "IconButton"

export default memo(IconButton)
