import "./styles.styl";
import React, { ReactNode } from "react";
import type { IconProps } from "./types";
export interface IconWrapperProps extends IconProps {
    children?: ReactNode;
    disableStroke?: boolean;
}
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<IconWrapperProps & React.RefAttributes<SVGSVGElement>>>;
export default _default;
