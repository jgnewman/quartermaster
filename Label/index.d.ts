import "./styles.css";
import React from "react";
export interface LabelProps {
    className?: string;
    htmlFor?: string;
    isRequired?: boolean;
    text: string;
}
declare function Label({ className, htmlFor, isRequired, text, }: LabelProps): JSX.Element;
declare namespace Label {
    var displayName: string;
}
declare const _default: React.MemoExoticComponent<typeof Label>;
export default _default;
