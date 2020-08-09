import React, { memo, } from "react";
import { buildClassNames } from "../lib/helpers";
import Checkmark from "../icons/Checkmark";
import Space from "../Space";
function MenuLink({ clickHandler, component: CustomComponent, href, isActive, isCompact, text, }) {
    const smallPad = isCompact ? "xs" : "s";
    const largePad = isCompact ? "m" : "l";
    const linkAttrs = {
        className: "qmMenuLink",
    };
    if (clickHandler) {
        linkAttrs.onClick = clickHandler;
    }
    if (href) {
        linkAttrs.href = href;
    }
    const iconClasses = buildClassNames({ isCompact });
    const content = (React.createElement(Space, { className: "qmMenuLinkContent", top: smallPad, right: largePad, bottom: smallPad, left: largePad },
        React.createElement("span", { className: "qmMenuLinkText" }, text),
        isActive && (React.createElement(Checkmark, { className: `qmMenuActiveIcon ${iconClasses}`, size: "s" }))));
    return CustomComponent
        ? React.createElement(CustomComponent, Object.assign({}, linkAttrs), content)
        : React.createElement("a", Object.assign({}, linkAttrs), content);
}
MenuLink.displayName = "MenuLink";
export default memo(MenuLink);
//# sourceMappingURL=MenuLink.js.map