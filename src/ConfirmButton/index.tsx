import "./styles.styl"

import React, {
  MouseEventHandler,
  MutableRefObject,
  ReactNode,
  forwardRef,
  memo,
} from "react"

import Align from "../Align"
import Button, { ButtonProps } from "../Button"
import Modal from "../Modal"

import {
  useOpenStateHandlers,
  useModalRenderLogic,
} from "./hooks"

export interface ConfirmButtonProps extends Exclude<ButtonProps, "highlight"> {
  cancelText?: string
  children?: ReactNode
  confirmationText?: string
  continueText?: string
  disableHighlights?: boolean
  postCancelHook?: MouseEventHandler
  skipConfirmation?: boolean
  useCompactModalButtons?: boolean
}

const ConfirmButton = forwardRef(function ({
  cancelText,
  children,
  clickHandler,
  confirmationText,
  continueText,
  disableHighlights,
  postCancelHook,
  skipConfirmation = false,
  useCompactModalButtons,
  ...rest
}: ConfirmButtonProps, ref: MutableRefObject<HTMLAnchorElement | HTMLButtonElement>) {


  const {
    isOpen,
    handleClick,
    handleContinue,
    handleCancel,
  } = useOpenStateHandlers(skipConfirmation, clickHandler, postCancelHook)

  const shouldRenderModal = useModalRenderLogic(skipConfirmation)

  const buttonProps = {
    ...rest,
    clickHandler: handleClick,
    ref: ref,
  }

  const positiveProps: Partial<ButtonProps> = {}
  if (!disableHighlights) {
    positiveProps.highlight = "positive"
  }

  const negativeProps: Partial<ButtonProps> = {}
  if (!disableHighlights) {
    negativeProps.highlight = "negative"
  }

  return (
    <>

      <Button {...buttonProps}>
        {children}
      </Button>

      {shouldRenderModal && (
        <Modal
          className="qmConfButtonModal"
          hideCloseButton={true}
          isOpen={isOpen}>

          <h2 className="qmConfButtonTitle">
            {confirmationText || "Are you sure?"}
          </h2>

          <div className="qmConfButtonOptions">
            <Align>
              <Button
                className="qmConfButtonContinue"
                clickHandler={handleContinue}
                isCompact={!!useCompactModalButtons}
                {...positiveProps}>
                { continueText || "Yes" }
              </Button>

              <Button
                className="qmConfButtonCancel"
                clickHandler={handleCancel}
                isCompact={!!useCompactModalButtons}
                {...negativeProps}>
                { cancelText || "Nevermind" }
              </Button>
            </Align>
          </div>

        </Modal>
      )}

    </>
  )

})

ConfirmButton.displayName = "ConfirmButton"

export default memo(ConfirmButton)
