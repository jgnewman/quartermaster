import "./styles.styl"
import React, { Component } from "react"

import { noopEvtHandler } from "../lib/helpers"
import Button, { ButtonProps } from "../Button"
import Modal from "../Modal"

import { DynamicProps } from "../lib/helperTypes"

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
  static displayName = "ConfirmButton"
  public state = { open: false }

  openConfirmation() {
    this.setState({ open: true })
  }

  closeConfirmation() {
    this.setState({ open: false })
  }

  handleClick = (evt: React.MouseEvent) => {
    evt.preventDefault()
    this.openConfirmation()
  }

  handleContinue = (evt: React.MouseEvent) => {
    const { clickHandler } = this.props
    evt.preventDefault()
    this.closeConfirmation()
    return (clickHandler || noopEvtHandler)(evt)
  }

  handleCancel = (evt: React.MouseEvent) => {
    const { postCancelHook } = this.props
    evt.preventDefault()
    this.closeConfirmation()
    return (postCancelHook || noopEvtHandler)(evt)
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

    const buttonProps = {
      ...rest,
      clickHandler: this.handleClick,
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
          className="qmConfButtonModal"
          hideCloseButton={true}
          isOpen={this.state.open}>

          <h2 className="qmConfButtonTitle">
            {confirmationText || "Are you sure?"}
          </h2>

          <div className="qmConfButtonOptions">
            <Button
              className="qmConfButtonContinue"
              clickHandler={this.handleContinue}
              {...positiveProps}>
              { continueText || "Yes" }
            </Button>

            <Button
              className="qmConfButtonCancel"
              clickHandler={this.handleCancel}
              {...negativeProps}>
              { cancelText || "Nevermind" }
            </Button>
          </div>

        </Modal>

      </>
    )
  }
}

export default ConfirmButton
