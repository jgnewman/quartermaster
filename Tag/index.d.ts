import "./styles.css";
import React from "react";
export interface TagProps {
    className?: string;
    color?: "gray" | "red" | "orange" | "yellow" | "green" | "blue" | "purple";
    text: string;
}
declare function Tag({ className, color, text, }: TagProps): JSX.Element;
declare namespace Tag {
    var displayName: string;
}
declare const _default: React.MemoExoticComponent<typeof Tag>;
export default _default;
