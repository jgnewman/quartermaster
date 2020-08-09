import React, { memo } from "react";
import Label from "../Label";
import Space from "../Space";
function MenuLabel({ isCompact, text }) {
    const largePad = isCompact ? "m" : "l";
    const smallPad = isCompact ? "xs" : "s";
    return (React.createElement(Space, { className: "qmMenuLabelWrapper", bottom: smallPad, right: largePad, left: largePad },
        React.createElement(Label, { className: "qmMenuLabel", text: text })));
}
MenuLabel.displayName = "MenuLabel";
export default memo(MenuLabel);
//# sourceMappingURL=MenuLabel.js.map