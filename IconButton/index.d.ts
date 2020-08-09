import "./styles.css";
import React, { MouseEventHandler, ReactNode } from "react";
export interface IconButtonProps {
    children?: ReactNode;
    className?: string;
    clickHandler?: MouseEventHandler;
    href?: string;
    tag?: "a" | "button";
}
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<IconButtonProps & React.RefAttributes<HTMLAnchorElement | HTMLButtonElement>>>;
export default _default;
