import React, { ReactNode } from "react";
import { ThemeProps } from "../Theme";
export interface ThemeExtensionProps extends ThemeProps {
    base: ThemeProps["data"];
    children?: ReactNode;
}
declare function ThemeExtension({ base, data, children, }: ThemeExtensionProps): JSX.Element;
declare namespace ThemeExtension {
    var displayName: string;
}
declare const _default: React.MemoExoticComponent<typeof ThemeExtension>;
export default _default;
