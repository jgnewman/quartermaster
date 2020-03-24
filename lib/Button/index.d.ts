import React, { PureComponent, ReactNode, ReactNodeArray } from "react";
export interface ButtonProps {
    children?: ReactNode | ReactNodeArray;
    tag?: "a" | "button";
    text?: string;
    className?: string;
    isDisabled?: boolean;
    isProcessing?: boolean;
    clickHandler?: React.MouseEventHandler;
}
declare class Button extends PureComponent<ButtonProps> {
    static displayName: string;
    render(): JSX.Element;
}
export default Button;
