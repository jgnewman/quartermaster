import React, { Component } from "react"

import { noopEvtHandler } from "../lib/helpers"
import Button, { ButtonProps } from "../Button"
import Modal from "../Modal"

import { StyledTitleH2 } from "./styles"

export interface ConfirmButtonProps extends ButtonProps {
  cancelText?: string
  confirmationText?: string
  continueText?: string
  postCancelHook?: React.MouseEventHandler
}

interface ConfirmButtonState {
  open: boolean
}

class ConfirmButton extends Component<ConfirmButtonProps, ConfirmButtonState> {
  public static displayName = "ConfirmButton"
  public state = { open: false }

  openConfirmation() {
    this.setState({ open: true })
  }

  closeConfirmation() {
    this.setState({ open: false })
  }

  render() {
    const {
      children,
      clickHandler,
      cancelText,
      continueText,
      confirmationText,
      postCancelHook,
      ...rest
    } = this.props

    const buttonClickHandler = (evt: React.MouseEvent) => {
      evt.preventDefault()
      this.openConfirmation()
    }

    const confirmationContinueHandler = (evt: React.MouseEvent) => {
      evt.preventDefault()
      this.closeConfirmation()
      return (clickHandler || noopEvtHandler)(evt)
    }

    const confirmationCancelHandler = (evt: React.MouseEvent) => {
      evt.preventDefault()
      this.closeConfirmation()
      return (postCancelHook || noopEvtHandler)(evt)
    }

    const buttonProps = {
      ...rest,
      clickHandler: buttonClickHandler,
    }

    return (
      <>

        <Button {...buttonProps}>
          {children}
        </Button>

        <Modal
          className="qm-confirm-button-modal"
          hideCloseButton={true}
          isOpen={this.state.open}>

          <StyledTitleH2 className="qm-confirm-button-title">
            {confirmationText || "Are you sure?"}
          </StyledTitleH2>

          <div className="qm-confirm-button-options">
            <Button className="qm-confirm-button-continue" clickHandler={confirmationContinueHandler}>
              { continueText || "Yes" }
            </Button>

            <Button className="qm-confirm-button-cancel" clickHandler={confirmationCancelHandler}>
              { cancelText || "Nevermind" }
            </Button>
          </div>

        </Modal>

      </>
    )
  }
}

export default ConfirmButton
