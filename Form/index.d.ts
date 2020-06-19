import React, { ChangeEvent, ReactNode, ReactNodeArray } from "react";
import type { ValidValueRange } from "../DatePicker/types";
declare type SimpleValue = string | number | boolean | null;
interface SimpleObject {
    [key: string]: SimpleValue | ValidValueRange;
}
declare type SetFormState = (vals: SimpleObject) => void;
declare type UpdateValueFor = (name: string) => (evt: ChangeEvent | SimpleValue | ValidValueRange) => void;
declare type ToggleCheckedFor = (name: string) => () => void;
interface FormUtils {
    formState: any;
    setFormState: SetFormState;
    updateValueFor: UpdateValueFor;
    toggleCheckedFor: ToggleCheckedFor;
}
export interface FormProps {
    children: (utils: FormUtils) => ReactNode | ReactNodeArray;
    initialState: SimpleObject;
}
declare function Form({ children, initialState, }: FormProps): JSX.Element;
declare namespace Form {
    var displayName: string;
}
declare const _default: React.MemoExoticComponent<typeof Form>;
export default _default;
