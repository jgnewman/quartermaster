import "./styles.css";
import React, { ChangeEventHandler } from "react";
export interface SliderProps {
    changeHandler?: ChangeEventHandler;
    className?: string;
    formatValue?: (n: number) => string;
    hasTicks?: boolean;
    id?: string;
    isCompact?: boolean;
    isDisabled?: boolean;
    isRequired?: boolean;
    label?: string;
    max: number;
    min: number;
    tabIndex?: number;
    value: number;
}
declare function Slider({ changeHandler, className, formatValue, hasTicks, id, isCompact, isDisabled, isRequired, label, max, min, tabIndex, value, }: SliderProps): JSX.Element;
declare namespace Slider {
    var displayName: string;
}
declare const _default: React.MemoExoticComponent<typeof Slider>;
export default _default;
