import "./styles.css";
import React, { memo } from "react";
import { buildClassNames } from "../lib/helpers";
import Text from "../Text";
function Tag({ className, color = "gray", text, }) {
    const containerClasses = buildClassNames({
        [`is${color[0].toUpperCase()}${color.slice(1)}`]: true,
    });
    return (React.createElement(Text, { className: `qmTagContainer ${containerClasses} ${className || ""}`, text: text, isBold: true, isUppercase: true }));
}
Tag.displayName = "Tag";
export default memo(Tag);
//# sourceMappingURL=index.js.map