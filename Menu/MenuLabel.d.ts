import React from "react";
export interface MenuLabelProps {
    isCompact?: boolean;
    text: string;
}
declare function MenuLabel({ isCompact, text }: MenuLabelProps): JSX.Element;
declare namespace MenuLabel {
    var displayName: string;
}
declare const _default: React.MemoExoticComponent<typeof MenuLabel>;
export default _default;
