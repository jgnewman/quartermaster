import "./styles.styl"
import React, { PureComponent } from "react"

import { buildClassNames, noopEvtHandler } from "../lib/helpers"
import Icon from "../Icon"

export interface ModalProps {
  className?: string
  closeHandler?: React.MouseEventHandler
  hideCloseButton?: boolean
  isOpen: boolean
}

class Modal extends PureComponent<ModalProps> {
  static displayName = "Modal"
  private body: HTMLElement = window.document.body
  private originalBodyHeight: string = this.body.style.height
  private originalBodyOverflow: string = this.body.style.overflow

  disableScrolling() {
    this.originalBodyHeight = this.body.style.height
    this.originalBodyOverflow = this.body.style.overflow

    this.body.style.height = "100%"
    this.body.style.overflow = "hidden"
  }

  enableScrolling() {
   this.body.style.height = this.originalBodyHeight
   this.body.style.overflow = this.originalBodyOverflow
  }

  handleScrolling() {
    const { isOpen } = this.props

    if (isOpen) {
      this.disableScrolling()
    } else {
      this.enableScrolling()
    }
  }

  componentDidMount() {
    this.handleScrolling()
  }

  componentDidUpdate() {
    this.handleScrolling()
  }

  render() {
    const {
      children,
      className,
      closeHandler,
      hideCloseButton,
      isOpen,
    } = this.props

    const isClosed = !isOpen

    const containerClasses = buildClassNames({
      isClosed,
      isOpen,
    })

    return (
      <div className={`qmModalContainer ${containerClasses} ${className || ""}`}>

        {!hideCloseButton && (
          <button
            className="qmModalClose"
            onClick={closeHandler || noopEvtHandler}>
            <Icon
              type="ex"
              size={16}
              className="qmModalCloseIcon"
            />
          </button>
        )}

        <div className="qmModalContent">
          {children}
        </div>

      </div>
    )
  }
}

export default Modal
