import "./styles.css";
import React, { ReactNode } from "react";
export interface ParagraphProps {
    children?: ReactNode;
    className?: string;
    isSmaller?: boolean;
}
declare function Paragraph({ children, className, isSmaller, }: ParagraphProps): JSX.Element;
declare namespace Paragraph {
    var displayName: string;
}
declare const _default: React.MemoExoticComponent<typeof Paragraph>;
export default _default;
