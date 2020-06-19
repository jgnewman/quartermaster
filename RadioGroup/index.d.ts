import React, { ChangeEventHandler, MutableRefObject } from "react";
export interface RadioOptionSettingsObject {
    ref?: MutableRefObject<HTMLInputElement>;
    id?: string;
    label: string;
    tabIndex?: number;
    value: string;
}
export interface RadioGroupProps {
    changeHandler?: ChangeEventHandler;
    className?: string;
    isDisabled?: boolean;
    name: string;
    options: RadioOptionSettingsObject[];
    value: string;
}
declare function RadioGroup({ className, changeHandler, isDisabled, name, options, value, }: RadioGroupProps): JSX.Element;
declare namespace RadioGroup {
    var displayName: string;
}
declare const _default: React.MemoExoticComponent<typeof RadioGroup>;
export default _default;
