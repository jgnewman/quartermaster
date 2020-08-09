import "./styles.css";
import React, { MouseEventHandler, ReactNode } from "react";
import { ButtonProps } from "../Button";
export interface ConfirmButtonProps extends Exclude<ButtonProps, "highlight"> {
    cancelText?: string;
    children?: ReactNode;
    confirmationText?: string;
    continueText?: string;
    disableHighlights?: boolean;
    postCancelHook?: MouseEventHandler;
    skipConfirmation?: boolean;
    useCompactModalButtons?: boolean;
}
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<ConfirmButtonProps & React.RefAttributes<HTMLAnchorElement | HTMLButtonElement>>>;
export default _default;
