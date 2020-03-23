import React, { Component } from "react"

import { noopEvtHandler } from "./lib/noops"

import Button, { ButtonProps } from "./Button"
import Modal from "./Modal"

export interface ConfirmButtonProps extends ButtonProps {
  confirmationText?: string
  confirmationContinueText?: string
  confirmationCancelText?: string
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
      className,
      clickHandler,
      confirmationCancelText,
      confirmationContinueText,
      confirmationText,
      isDisabled,
      isProcessing,
      tag,
      text,
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
    }

    return (
      <>
        <Button
          tag={tag}
          text={text}
          className={className}
          isDisabled={isDisabled}
          isProcessing={isProcessing}
          clickHandler={buttonClickHandler}
        >
          {children}
        </Button>
        <Modal
          className="qm-confirm-button"
          hideCloseButton={true}
          isOpen={this.state.open}>
          <div className="qm-confirm-button-content">
            <h1 className="qm-confirm-button-title">{confirmationText || "Are you sure?"}</h1>
            <div className="qm-confirm-button-options">
              <a className="qm-confirm-button-continue" onClick={confirmationContinueHandler}>
                { confirmationContinueText || "Yes" }
              </a>
              <a className="qm-confirm-button-cancel" onClick={confirmationCancelHandler}>
                { confirmationCancelText || "Nevermind" }
              </a>
            </div>
          </div>
        </Modal>
      </>
    )
  }
}

export default ConfirmButton
