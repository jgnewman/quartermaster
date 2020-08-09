import React, { memo } from "react";
import Space from "../Space";
function MenuSeparator({ isCompact }) {
    const paddingSize = isCompact ? "xs" : "s";
    return (React.createElement(Space, { className: "qmMenuSeparatorWrapper", bottom: paddingSize },
        React.createElement("hr", { className: "qmMenuSeparator" })));
}
MenuSeparator.displayName = "MenuSeparator";
export default memo(MenuSeparator);
//# sourceMappingURL=MenuSeparator.js.map