import "./styles.css";
import React, { ChangeEventHandler } from "react";
export interface RadioButtonProps {
    changeHandler?: ChangeEventHandler;
    className?: string;
    groupName?: string;
    id?: string;
    isChecked: boolean;
    isDisabled?: boolean;
    label?: string;
    tabIndex?: number;
    value?: string;
}
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<RadioButtonProps & React.RefAttributes<HTMLInputElement>>>;
export default _default;
