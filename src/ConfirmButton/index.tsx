import "./styles.styl"

import React, {
  MouseEvent,
  MouseEventHandler,
  MutableRefObject,
  ReactNode,
  forwardRef,
  memo,
  useCallback,
  useState,
} from "react"

import { noopEvtHandler, usePrevious } from "../lib/helpers"

import Align from "../Align"
import Button, { ButtonProps } from "../Button"
import Modal from "../Modal"

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
  skipConfirmation,
  useCompactModalButtons,
  ...rest
}: ConfirmButtonProps, ref: MutableRefObject<HTMLAnchorElement | HTMLButtonElement>) {

  const [renderModal, setRenderModal] = useState(!skipConfirmation)
  const [isOpen, setOpen] = useState(false)
  const wasSkipConfirmation = usePrevious(skipConfirmation)

  if (!wasSkipConfirmation && skipConfirmation && renderModal) {
    setTimeout(() => setRenderModal(false), 500)
  }

  if (wasSkipConfirmation && !skipConfirmation && !renderModal) {
    setRenderModal(true)
  }

  const handleClick = useCallback((evt: MouseEvent) => {
    evt.preventDefault()

    if (skipConfirmation) {
      clickHandler && clickHandler(evt)
    } else {
      setOpen(true)
    }
  }, [skipConfirmation, clickHandler, setOpen])

  const handleContinue = useCallback((evt: MouseEvent) => {
    evt.preventDefault()
    setOpen(false)
    return (clickHandler || noopEvtHandler)(evt)
  }, [clickHandler, setOpen])

  const handleCancel = useCallback((evt: MouseEvent) => {
    evt.preventDefault()
    setOpen(false)
    return (postCancelHook || noopEvtHandler)(evt)
  }, [postCancelHook, setOpen])

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

      {renderModal && (
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
