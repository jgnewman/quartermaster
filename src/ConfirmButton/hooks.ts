
import {
  Dispatch,
  MouseEvent,
  MouseEventHandler,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react"

import {
  noopEvtHandler,
} from "../lib/helpers"

import {
  usePrevious,
} from "../lib/hooks"

export function useModalRenderLogic(skipConfirmation: boolean): boolean {
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

export function useClickHandler(
  skipConfirmation: boolean,
  clickHandler: MouseEventHandler | undefined,
  setModalOpen: Dispatch<SetStateAction<boolean>>,
) {

  return useCallback(function (evt: MouseEvent) {
    evt.preventDefault()
    skipConfirmation ? (clickHandler && clickHandler(evt)) : setModalOpen(true)
  }, [
    clickHandler,
    skipConfirmation,
    setModalOpen,
  ])
}

export function useContinueHandler(
  clickHandler: MouseEventHandler | undefined,
  setModalOpen: Dispatch<SetStateAction<boolean>>,
) {

  return useCallback(function (evt: MouseEvent) {
    evt.preventDefault()
    setModalOpen(false)
    return (clickHandler || noopEvtHandler)(evt)
  }, [
    clickHandler,
    setModalOpen,
  ])
}

export function useCancelHandler(
  setModalOpen: Dispatch<SetStateAction<boolean>>,
  postCancelHook: MouseEventHandler | undefined,
) {

  return useCallback(function (evt: MouseEvent) {
    evt.preventDefault()
    setModalOpen(false)
    return (postCancelHook || noopEvtHandler)(evt)
  }, [
    setModalOpen,
    postCancelHook,
  ])
}

export function useOpenStateHandlers(
  skipConfirmation: boolean,
  clickHandler: MouseEventHandler | undefined,
  postCancelHook: MouseEventHandler | undefined,
) {

  const [isOpen, setModalOpen] = useState(false)
  const handleClick = useClickHandler(skipConfirmation, clickHandler, setModalOpen)
  const handleContinue = useContinueHandler(clickHandler, setModalOpen)
  const handleCancel = useCancelHandler(setModalOpen, postCancelHook)

  return {
    isOpen,
    handleClick,
    handleContinue,
    handleCancel,
  }
}
