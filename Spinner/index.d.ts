import "./styles.css";
import React from "react";
import type { IconSize } from "../icons/types";
export interface SpinnerProps {
    className?: string;
    size: IconSize;
}
declare function Spinner({ className, size, }: SpinnerProps): JSX.Element;
declare namespace Spinner {
    var displayName: string;
}
declare const _default: React.MemoExoticComponent<typeof Spinner>;
export default _default;
