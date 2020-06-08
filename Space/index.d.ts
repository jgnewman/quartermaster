import "./styles.css";
import React, { ReactNode } from "react";
export declare type SpaceSize = "xs" | "s" | "m" | "i" | "l" | "xl";
export interface SpaceProps {
    children?: ReactNode;
    className?: string;
    bottom?: SpaceSize;
    left?: SpaceSize;
    right?: SpaceSize;
    top?: SpaceSize;
}
declare function Space({ children, className, bottom, left, right, top, }: SpaceProps): JSX.Element;
declare namespace Space {
    var displayName: string;
}
declare const _default: React.MemoExoticComponent<typeof Space>;
export default _default;
