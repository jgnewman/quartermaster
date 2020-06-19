import "./styles.css";
import React from "react";
export interface CharLimitCounterProps {
    className?: string;
    count: number;
    hideProgressBar?: boolean;
    hideText?: boolean;
    isCompact?: boolean;
    isTextArea?: boolean;
    limit: number;
    limitIsMinimum?: boolean;
}
declare function CharLimitCounter({ className, count, hideProgressBar, hideText, isCompact, isTextArea, limit, limitIsMinimum, }: CharLimitCounterProps): JSX.Element;
declare namespace CharLimitCounter {
    var displayName: string;
}
declare const _default: React.MemoExoticComponent<typeof CharLimitCounter>;
export default _default;
