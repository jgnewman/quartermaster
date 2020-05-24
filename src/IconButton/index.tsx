import "./styles.styl"
import React, {
  MouseEventHandler,
  MutableRefObject,
  ReactNode,
  forwardRef,
  memo,
} from "react"

import Button from "../Button"

import { noopEvtHandler } from "../lib/helpers"

export interface IconButtonProps {
  children?: ReactNode
  className?: string
  clickHandler?: MouseEventHandler
  href?: string
  tag?: "a" | "button"
}

const IconButton = forwardRef(function ({
  children,
  className = "",
  clickHandler = noopEvtHandler,
  href,
  tag,
}: IconButtonProps, ref: MutableRefObject<HTMLAnchorElement | HTMLButtonElement>) {

  return (
    <span className={`qmIconButtonContainer ${className}`}>
      <span className="qmIconButtonEffect"></span>
      <Button
        className="qmIconButton"
        clickHandler={clickHandler}
        href={href}
        tag={tag}
        ref={ref}>
        { children }
      </Button>
    </span>
  )
})

IconButton.displayName = "IconButton"

export default memo(IconButton)
