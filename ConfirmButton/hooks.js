import { useCallback, useEffect, useState, } from "react";
import { noopEvtHandler, } from "../lib/helpers";
import { usePrevious, } from "../lib/hooks";
export function useModalRenderLogic(skipConfirmation) {
    const [shouldRenderModal, setShouldRenderModal] = useState(!skipConfirmation);
    const wasSkipConfirmation = usePrevious(skipConfirmation);
    useEffect(function () {
        if (!wasSkipConfirmation && skipConfirmation && shouldRenderModal) {
            setTimeout(() => setShouldRenderModal(false), 500);
        }
        if (wasSkipConfirmation && !skipConfirmation && !shouldRenderModal) {
            setShouldRenderModal(true);
        }
    }, [
        wasSkipConfirmation,
        skipConfirmation,
        shouldRenderModal,
    ]);
    return shouldRenderModal;
}
export function useClickHandler(skipConfirmation, clickHandler, setModalOpen) {
    return useCallback(function (evt) {
        evt.preventDefault();
        skipConfirmation ? (clickHandler && clickHandler(evt)) : setModalOpen(true);
    }, [
        clickHandler,
        skipConfirmation,
        setModalOpen,
    ]);
}
export function useContinueHandler(clickHandler, setModalOpen) {
    return useCallback(function (evt) {
        evt.preventDefault();
        setModalOpen(false);
        return (clickHandler || noopEvtHandler)(evt);
    }, [
        clickHandler,
        setModalOpen,
    ]);
}
export function useCancelHandler(setModalOpen, postCancelHook) {
    return useCallback(function (evt) {
        evt.preventDefault();
        setModalOpen(false);
        return (postCancelHook || noopEvtHandler)(evt);
    }, [
        setModalOpen,
        postCancelHook,
    ]);
}
export function useOpenStateHandlers(skipConfirmation, clickHandler, postCancelHook) {
    const [isOpen, setModalOpen] = useState(false);
    const handleClick = useClickHandler(skipConfirmation, clickHandler, setModalOpen);
    const handleContinue = useContinueHandler(clickHandler, setModalOpen);
    const handleCancel = useCancelHandler(setModalOpen, postCancelHook);
    return {
        isOpen,
        handleClick,
        handleContinue,
        handleCancel,
    };
}
//# sourceMappingURL=hooks.js.map