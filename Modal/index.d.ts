import "./styles.css";
import React, { MouseEventHandler, ReactNode } from "react";
export interface ModalProps {
    children?: ReactNode;
    className?: string;
    closeHandler?: MouseEventHandler;
    hideCloseButton?: boolean;
    isOpen: boolean;
}
declare function Modal({ children, className, closeHandler, hideCloseButton, isOpen, }: ModalProps): JSX.Element;
declare namespace Modal {
    var displayName: string;
}
declare const _default: React.MemoExoticComponent<typeof Modal>;
export default _default;
