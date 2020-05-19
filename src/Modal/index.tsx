import "./styles.styl"

import React, {
  MouseEventHandler,
  ReactNode,
  memo,
  useCallback,
  useEffect,
} from "react"

import {
  buildClassNames,
  disableScrolling,
  enableScrolling,
  noopEvtHandler,
} from "../lib/helpers"

import IconButton from "../IconButton"

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

  console.log({ isOpen })

  const handleScrolling = useCallback(() => {
    isOpen ? disableScrolling() : enableScrolling()
  }, [isOpen])

  useEffect(() => {
    handleScrolling()
    return () => { handleScrolling() }
  }, [handleScrolling])

  const isClosed = !isOpen

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
            clickHandler={closeHandler || noopEvtHandler}
            type="ex"
            size="s"
          />
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
