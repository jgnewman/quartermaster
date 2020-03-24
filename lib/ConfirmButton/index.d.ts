import { Component } from "react";
import { ButtonProps } from "../Button";
export interface ConfirmButtonProps extends ButtonProps {
    confirmationText?: string;
    confirmationContinueText?: string;
    confirmationCancelText?: string;
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
