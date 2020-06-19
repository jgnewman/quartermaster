import "./styles.css";
import React, { ChangeEventHandler } from "react";
export interface CheckboxProps {
    changeHandler?: ChangeEventHandler;
    className?: string;
    id?: string;
    isChecked: boolean;
    isDisabled?: boolean;
    label?: string;
    tabIndex?: number;
    value?: string;
}
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLInputElement>>>;
export default _default;
