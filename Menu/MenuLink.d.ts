import React, { MouseEventHandler } from "react";
export interface MenuLinkProps {
    clickHandler?: MouseEventHandler;
    component?: Function;
    href?: string;
    isActive?: boolean;
    isCompact?: boolean;
    text: string;
}
declare function MenuLink({ clickHandler, component: CustomComponent, href, isActive, isCompact, text, }: MenuLinkProps): JSX.Element;
declare namespace MenuLink {
    var displayName: string;
}
declare const _default: React.MemoExoticComponent<typeof MenuLink>;
export default _default;
