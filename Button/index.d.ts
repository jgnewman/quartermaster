import "./styles.css";
import React, { MouseEventHandler, ReactNode } from "react";
export interface ButtonProps {
    children?: ReactNode;
    className?: string;
    clickHandler?: MouseEventHandler;
    highlight?: "positive" | "negative";
    href?: string;
    isCompact?: boolean;
    isDisabled?: boolean;
    isProcessing?: boolean;
    tag?: "a" | "button";
    text?: string;
}
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLAnchorElement | HTMLButtonElement>>>;
export default _default;
