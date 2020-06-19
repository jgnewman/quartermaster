import React, { Dispatch, SetStateAction } from "react";
import type { DatePickerChangeHandler } from "./types";
interface DatePickerControls {
    changeHandler?: DatePickerChangeHandler;
    enableRange?: boolean;
    isCompact?: boolean;
    isDisabled?: boolean;
    isOpen: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}
declare const DatePickerControls: React.ForwardRefExoticComponent<DatePickerControls & React.RefAttributes<HTMLButtonElement>>;
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<DatePickerControls & React.RefAttributes<HTMLButtonElement>>>;
export default _default;
