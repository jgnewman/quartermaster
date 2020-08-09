import "./styles.css";
import React, { ReactNode } from "react";
export interface AnimationProps {
    children?: ReactNode;
    className?: string;
    direction?: "left" | "right" | "up" | "down";
    displayNoneOnHide?: boolean;
    duration?: number;
    override?: "hide" | "show" | null;
    removeOnHide?: boolean;
    style?: any;
    type: "fadeIn" | "fadeOut";
}
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<AnimationProps & React.RefAttributes<HTMLDivElement>>>;
export default _default;
