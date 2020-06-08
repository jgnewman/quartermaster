import React, { ChangeEvent, ReactNode, ReactNodeArray } from "react";
import type { FauxChangeEvent } from "../lib/helperTypes";
interface SimpleObject {
    [key: string]: string | number | boolean | null;
}
declare type SetFormState = (vals: SimpleObject) => void;
declare type UpdateValueFor = (name: string) => (evt: ChangeEvent | FauxChangeEvent | string | null) => void;
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
