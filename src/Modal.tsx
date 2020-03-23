import React, {
  Component,
  ReactNode,
  ReactNodeArray,
} from "react"

import { noopEvtHandler } from "./lib/noops"

import CloseIcon from "./icons/CloseIcon"
import Button from "./Button"

export interface ModalProps {
  children?: ReactNode | ReactNodeArray
  className?: string
  isOpen: boolean
  hideCloseButton?: boolean
  closeHandler?: React.MouseEventHandler
}

class Modal extends Component<ModalProps> {
  public static displayName = "Modal"
  private body: HTMLElement = window.document.body

  disableScrolling() {
    this.body.setAttribute("style", "height: 100%; overflow: hidden;")
  }

  enableScrolling() {
    this.body.removeAttribute("style")
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
      isOpen,
      hideCloseButton,
      closeHandler,
    } = this.props

    return (
      <div className={`qm-modal ${isOpen ? "is-open" : "is-closed"} ${className || ""}`}>
        {!hideCloseButton && (
          <Button
            className="qm-modal-close-button"
            clickHandler={closeHandler || noopEvtHandler}>
            <CloseIcon />
          </Button>
        )}
        {children}
      </div>
    )
  }
}

export default Modal
