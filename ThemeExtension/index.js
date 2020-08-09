import React, { memo, } from "react";
import Theme from "../Theme";
function ThemeExtension({ base, data, children, }) {
    return (React.createElement(Theme, { data: data },
        React.createElement(Theme, { data: base }, children)));
}
ThemeExtension.displayName = "ThemeExtension";
export default memo(ThemeExtension);
//# sourceMappingURL=index.js.map