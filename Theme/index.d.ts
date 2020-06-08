/**
 * Theme
 *
 * Takes data describing how to build a stylesheet.
 * Builds and injects the stylesheet on mount.
 * Removes the stylesheet on unmount.
 *
 * <Theme
 *   data={{
 *     "background": {
 *       "#000000": `
 *         .foo,
 *         .bar.baz,
 *         #quux[disabled]
 *       `
 *     },
 *     "border-radius": {
 *       "50%": `.foo, .bar.baz, #quux[disabled]`
 *     }
 *   }}
 * />
 */
import React, { ReactNode } from "react";
interface ValueSpec {
    [key: string]: string;
}
interface CSSData {
    [key: string]: ValueSpec;
}
export interface ThemeProps {
    children?: ReactNode;
    data: CSSData | null;
}
declare function Theme({ children, data }: ThemeProps): JSX.Element | null;
declare namespace Theme {
    var displayName: string;
}
declare const _default: React.MemoExoticComponent<typeof Theme>;
export default _default;
