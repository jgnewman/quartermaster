import "./styles.css";
import React, { ReactNode } from "react";
export interface HeadingProps {
    children?: ReactNode;
    className?: string;
    isBlock?: boolean;
    isBold?: boolean;
    size: 1 | 2 | 3 | 4 | 5 | 6;
    text?: string;
}
declare function Heading({ children, className, isBlock, isBold, size, text, }: HeadingProps): JSX.Element;
declare namespace Heading {
    var displayName: string;
}
declare const _default: React.MemoExoticComponent<typeof Heading>;
export default _default;
