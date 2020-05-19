import "./styles.styl"

import React, {
  ReactNode,
  memo,
  useCallback,
  useState,
} from "react"

import { noopEvtHandler } from "../lib/helpers"
import Align from "../Align"
import Button, { ButtonProps } from "../Button"
import Modal from "../Modal"

import { DynamicProps } from "../lib/helperTypes"

export interface ConfirmButtonProps extends Exclude<ButtonProps, "highlight"> {
  cancelText?: string
  children?: ReactNode
  confirmationText?: string
  continueText?: string
  disableHighlights?: boolean
  postCancelHook?: React.MouseEventHandler
  skipConfirmation?: boolean
  useCompactModalButtons?: boolean
}

function ConfirmButton({
  cancelText,
  children,
  clickHandler,
  confirmationText,
  continueText,
  disableHighlights,
  postCancelHook,
  skipConfirmation,
  useCompactModalButtons,
  ...rest
}: ConfirmButtonProps) {

  const [isOpen, setOpen] = useState(false)
  const openConfirmation = useCallback(() => setOpen(true), [setOpen])
  const closeConfirmation = useCallback(() => setOpen(false), [setOpen])

  const handleClick = useCallback((evt: React.MouseEvent) => {
    evt.preventDefault()

    if (skipConfirmation) {
      clickHandler && clickHandler(evt)
    } else {
      openConfirmation()
    }
  }, [skipConfirmation, clickHandler, openConfirmation])

  const handleContinue = useCallback((evt: React.MouseEvent) => {
    evt.preventDefault()
    closeConfirmation()
    return (clickHandler || noopEvtHandler)(evt)
  }, [closeConfirmation, clickHandler])

  const handleCancel = useCallback((evt: React.MouseEvent) => {
    evt.preventDefault()
    closeConfirmation()
    return (postCancelHook || noopEvtHandler)(evt)
  }, [closeConfirmation, postCancelHook])


  const buttonProps = {
    ...rest,
    clickHandler: handleClick,
  }

  const positiveProps: DynamicProps = {}
  if (!disableHighlights) {
    positiveProps.highlight = "positive"
  }

  const negativeProps: DynamicProps = {}
  if (!disableHighlights) {
    negativeProps.highlight = "negative"
  }

  return (
    <>

      <Button {...buttonProps}>
        {children}
      </Button>

      {!skipConfirmation && (
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

}

ConfirmButton.displayName = "ConfirmButton"

export default memo(ConfirmButton)
