import "./styles.css";
import React, { ReactNode } from "react";
import { SpaceSize } from "../Space";
export interface GrowProps {
    children?: ReactNode;
    className?: string;
    size: 0 | 1 | 2 | 3;
}
export declare const Grow: React.NamedExoticComponent<GrowProps>;
export interface GridProps {
    children?: ReactNode;
    className?: string;
    gutterH?: "s" | "m" | "l";
    gutterW?: "s" | "m" | "l";
    justify?: "start" | "end" | "center" | "even" | "between" | "around";
    equalHeight?: boolean;
    wrap?: boolean;
    bottomSpace?: SpaceSize;
    leftSpace?: SpaceSize;
    rightSpace?: SpaceSize;
    topSpace?: SpaceSize;
}
declare function Grid({ bottomSpace, children, className, equalHeight, gutterH, gutterW, justify, leftSpace, rightSpace, topSpace, wrap, }: GridProps): JSX.Element;
declare namespace Grid {
    var displayName: string;
}
declare const _default: React.MemoExoticComponent<typeof Grid>;
export default _default;
