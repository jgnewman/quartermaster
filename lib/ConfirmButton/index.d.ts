import React, { Component } from "react";
import { ButtonProps } from "../Button";
export interface ConfirmButtonProps extends ButtonProps {
    cancelText?: string;
    confirmationText?: string;
    continueText?: string;
    postCancelHook?: React.MouseEventHandler;
}
interface ConfirmButtonState {
    open: boolean;
}
declare class ConfirmButton extends Component<ConfirmButtonProps, ConfirmButtonState> {
    static displayName: string;
    state: {
        open: boolean;
    };
    openConfirmation(): void;
    closeConfirmation(): void;
    render(): JSX.Element;
}
export default ConfirmButton;
