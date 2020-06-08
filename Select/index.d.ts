import "./styles.css";
import React from "react";
import type { SelectProps } from "./types";
export { SelectProps } from "./types";
declare function Select({ changeHandler, className, id, isCompact, isDisabled, isRequired, label, options, placeholder, position, value, }: SelectProps): JSX.Element;
declare namespace Select {
    var displayName: string;
}
declare const _default: React.MemoExoticComponent<typeof Select>;
export default _default;
