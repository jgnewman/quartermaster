import "./styles.styl"

import React, {
  MouseEventHandler,
  ReactNode,
  memo,
} from "react"

import {
  buildClassNames,
  noopEvtHandler,
} from "../lib/helpers"

import {
  useScrollHandling,
} from "../lib/internalHooks"

import IconButton from "../IconButton"
import Ex from "../icons/Ex"

export interface ModalProps {
  children?: ReactNode
  className?: string
  closeHandler?: MouseEventHandler
  hideCloseButton?: boolean
  isOpen: boolean
}

function Modal({
  children,
  className,
  closeHandler,
  hideCloseButton,
  isOpen,
}: ModalProps) {

  const isClosed = !isOpen

  useScrollHandling(isOpen)

  const containerClasses = buildClassNames({
    isClosed,
    isOpen,
  })

  return (
    <div className={`qmModalContainer ${containerClasses} ${className || ""}`}>

      {!hideCloseButton && (
        <div className="qmModalCloseWrapper">
          <IconButton
            className="qmModalClose"
            clickHandler={closeHandler || noopEvtHandler}>
            <Ex size="m" />
          </IconButton>
        </div>
      )}

      <div className="qmModalContent">
        {children}
      </div>

    </div>
  )

}

Modal.displayName = "Modal"

export default memo(Modal)
