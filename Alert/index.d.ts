import "./styles.css";
import React, { ReactNode } from "react";
export interface AlertProps {
    children?: ReactNode;
    className?: string;
    text?: string;
    type: "danger" | "info" | "warning";
}
declare function Alert({ children, className, text, type, }: AlertProps): JSX.Element;
declare namespace Alert {
    var displayName: string;
}
declare const _default: React.MemoExoticComponent<typeof Alert>;
export default _default;
