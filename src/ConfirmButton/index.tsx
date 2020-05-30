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
  useEffect,
} from "react"

import { noopEvtHandler } from "../lib/helpers"
import { usePrevious } from "../lib/hooks"

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

function useModalRenderLogic(skipConfirmation: boolean): boolean {
  const [shouldRenderModal, setShouldRenderModal] = useState(!skipConfirmation)
  const wasSkipConfirmation = usePrevious(skipConfirmation)

  useEffect(function () {
    if (!wasSkipConfirmation && skipConfirmation && shouldRenderModal) {
      setTimeout(() => setShouldRenderModal(false), 500)
    }

    if (wasSkipConfirmation && !skipConfirmation && !shouldRenderModal) {
      setShouldRenderModal(true)
    }
  }, [
    wasSkipConfirmation,
    skipConfirmation,
    shouldRenderModal,
  ])

  return shouldRenderModal
}

function useOpenStateHandlers(
  skipConfirmation: boolean,
  clickHandler: MouseEventHandler | undefined,
  postCancelHook: MouseEventHandler | undefined,
) {
  const [isOpen, setOpen] = useState(false)

  const handleClick = useCallback(function (evt: MouseEvent) {
    evt.preventDefault()
    skipConfirmation ? (clickHandler && clickHandler(evt)) : setOpen(true)
  }, [
    clickHandler,
    skipConfirmation,
    setOpen,
  ])

  const handleContinue = useCallback(function (evt: MouseEvent) {
    evt.preventDefault()
    setOpen(false)
    return (clickHandler || noopEvtHandler)(evt)
  }, [
    clickHandler,
    setOpen,
  ])

  const handleCancel = useCallback(function (evt: MouseEvent) {
    evt.preventDefault()
    setOpen(false)
    return (postCancelHook || noopEvtHandler)(evt)
  }, [
    setOpen,
    postCancelHook,
  ])

  return {
    isOpen,
    handleClick,
    handleContinue,
    handleCancel,
  }
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
