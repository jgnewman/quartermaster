import "./styles.css";
import React from "react";
import { AnimationProps } from "../Animation";
import { Data } from "./types";
export interface MenuProps {
    animate?: boolean | Pick<AnimationProps, "direction" | "duration">;
    className?: string;
    data: Data[];
    isCompact?: boolean;
    isLifted?: boolean;
    isOpen: boolean;
    maxWidth?: string;
    minWidth?: string;
}
declare function Menu({ animate, className, data, isCompact, isLifted, isOpen, minWidth, maxWidth, }: MenuProps): JSX.Element;
declare namespace Menu {
    var displayName: string;
}
declare const _default: React.MemoExoticComponent<typeof Menu>;
export default _default;
