import React, { PureComponent, ReactNode, ReactNodeArray } from "react";
export interface ButtonProps {
    children?: ReactNode | ReactNodeArray;
    className?: string;
    clickHandler?: React.MouseEventHandler;
    isDisabled?: boolean;
    isProcessing?: boolean;
    tag?: "a" | "button";
    text?: string;
}
declare class Button extends PureComponent<ButtonProps> {
    static displayName: string;
    render(): JSX.Element;
}
export default Button;
