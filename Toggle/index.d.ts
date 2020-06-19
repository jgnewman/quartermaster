import "./styles.css";
import React, { ChangeEventHandler } from "react";
export interface ToggleProps {
    changeHandler?: ChangeEventHandler;
    className?: string;
    id?: string;
    isChecked: boolean;
    isDisabled?: boolean;
    label?: string;
    tabIndex?: number;
    value?: string;
}
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<ToggleProps & React.RefAttributes<HTMLInputElement>>>;
export default _default;
