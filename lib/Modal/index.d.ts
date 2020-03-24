import React, { PureComponent, ReactNode, ReactNodeArray } from "react";
export interface ModalProps {
    children?: ReactNode | ReactNodeArray;
    className?: string;
    isOpen: boolean;
    hideCloseButton?: boolean;
    closeHandler?: React.MouseEventHandler;
}
declare class Modal extends PureComponent<ModalProps> {
    static displayName: string;
    private body;
    disableScrolling(): void;
    enableScrolling(): void;
    handleScrolling(): void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): JSX.Element;
}
export default Modal;
