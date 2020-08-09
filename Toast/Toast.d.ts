import React from "react";
import { ToastProps } from "./types";
declare function Toast({ alignment, id, body, duration, eventName, isBottom, isDismissible, type, }: ToastProps): JSX.Element;
declare namespace Toast {
    var displayName: string;
}
declare const _default: React.MemoExoticComponent<typeof Toast>;
export default _default;
