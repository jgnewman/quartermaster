import { Dispatch, MouseEvent, MouseEventHandler, SetStateAction } from "react";
export declare function useModalRenderLogic(skipConfirmation: boolean): boolean;
export declare function useClickHandler(skipConfirmation: boolean, clickHandler: MouseEventHandler | undefined, setModalOpen: Dispatch<SetStateAction<boolean>>): (evt: MouseEvent) => void;
export declare function useContinueHandler(clickHandler: MouseEventHandler | undefined, setModalOpen: Dispatch<SetStateAction<boolean>>): (evt: MouseEvent) => void;
export declare function useCancelHandler(setModalOpen: Dispatch<SetStateAction<boolean>>, postCancelHook: MouseEventHandler | undefined): (evt: MouseEvent) => void;
export declare function useOpenStateHandlers(skipConfirmation: boolean, clickHandler: MouseEventHandler | undefined, postCancelHook: MouseEventHandler | undefined): {
    isOpen: boolean;
    handleClick: (evt: MouseEvent<Element, globalThis.MouseEvent>) => void;
    handleContinue: (evt: MouseEvent<Element, globalThis.MouseEvent>) => void;
    handleCancel: (evt: MouseEvent<Element, globalThis.MouseEvent>) => void;
};
