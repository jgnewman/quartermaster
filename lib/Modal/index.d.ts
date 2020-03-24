import React, { PureComponent, ReactNode, ReactNodeArray } from "react";
export interface ModalProps {
    children?: ReactNode | ReactNodeArray;
    className?: string;
    closeHandler?: React.MouseEventHandler;
    hideCloseButton?: boolean;
    isOpen: boolean;
}
declare class Modal extends PureComponent<ModalProps> {
    static displayName: string;
    private body;
    private originalBodyHeight;
    private originalBodyOverflow;
    disableScrolling(): void;
    enableScrolling(): void;
    handleScrolling(): void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): JSX.Element;
}
export default Modal;
