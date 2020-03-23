import React, {
  PureComponent,
  ReactNode,
  ReactNodeArray,
} from "react"

import { noopEvtHandler } from "../lib/noops"
import CloseIcon from "../icons/CloseIcon"
import { StyledModalDiv, StyledModalContentDiv, StyledCloseButton } from "./styles"

export interface ModalProps {
  children?: ReactNode | ReactNodeArray
  className?: string
  isOpen: boolean
  hideCloseButton?: boolean
  closeHandler?: React.MouseEventHandler
}

class Modal extends PureComponent<ModalProps> {
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
      <StyledModalDiv
        className={`qm-modal ${isOpen ? "is-open" : "is-closed"} ${className || ""}`}
        isOpen={isOpen}>

        {!hideCloseButton && (
          <StyledCloseButton
            className="qm-modal-close-button"
            onClick={closeHandler || noopEvtHandler}>
            <CloseIcon />
          </StyledCloseButton>
        )}

        <StyledModalContentDiv>
          {children}
        </StyledModalContentDiv>

      </StyledModalDiv>
    )
  }
}

export default Modal
