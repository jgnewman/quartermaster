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
  closeHandler?: React.MouseEventHandler
  hideCloseButton?: boolean
  isOpen: boolean
}

class Modal extends PureComponent<ModalProps> {
  public static displayName = "Modal"
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
