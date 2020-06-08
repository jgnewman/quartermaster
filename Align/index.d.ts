import "./styles.css";
import React, { ReactNode } from "react";
import { SpaceSize } from "../Space";
export interface AlignProps {
    children?: ReactNode;
    className?: string;
    justify?: "left" | "center" | "right";
    bottomSpace?: SpaceSize;
    leftSpace?: SpaceSize;
    rightSpace?: SpaceSize;
    topSpace?: SpaceSize;
}
declare function Align({ children, className, justify, bottomSpace, leftSpace, rightSpace, topSpace, }: AlignProps): JSX.Element;
declare namespace Align {
    var displayName: string;
}
declare const _default: React.MemoExoticComponent<typeof Align>;
export default _default;
