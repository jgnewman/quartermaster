import React, { Component } from "react"

import { noopEvtHandler } from "../lib/helpers"
import Button, { ButtonProps } from "../Button"
import Modal from "../Modal"

import {
  DivOptionsWrapper,
  H2Title,
} from "./styles"
import { DynamicProps } from "src/lib/helperTypes"

export interface ConfirmButtonProps extends Exclude<ButtonProps, "highlight"> {
  cancelText?: string
  confirmationText?: string
  continueText?: string
  postCancelHook?: React.MouseEventHandler
  useHighlights?: boolean
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
      useHighlights,
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

    const positiveProps: DynamicProps = {}
    if (useHighlights) {
      positiveProps.highlight = "positive"
    }

    const negativeProps: DynamicProps = {}
    if (useHighlights) {
      negativeProps.highlight = "negative"
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

          <H2Title className="qm-confirm-button-title">
            {confirmationText || "Are you sure?"}
          </H2Title>

          <DivOptionsWrapper className="qm-confirm-button-options">
            <Button
              className="qm-confirm-button-continue"
              clickHandler={confirmationContinueHandler}
              {...positiveProps}>
              { continueText || "Yes" }
            </Button>

            <Button
              className="qm-confirm-button-cancel"
              clickHandler={confirmationCancelHandler}
              {...negativeProps}>
              { cancelText || "Nevermind" }
            </Button>
          </DivOptionsWrapper>

        </Modal>

      </>
    )
  }
}

export default ConfirmButton
