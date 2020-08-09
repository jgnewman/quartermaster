import "./styles.css";
import React, { memo, } from "react";
import Space from "../Space";
import Text from "../Text";
function Paragraph({ children, className, isSmaller, }) {
    return (React.createElement(Space, { className: `qmParagraphContainer ${className || ""}`, bottom: "i" },
        React.createElement(Text, { isBlock: true, isSmaller: isSmaller, className: "qmParagraph", tag: "p" }, children)));
}
Paragraph.displayName = "Paragraph";
export default memo(Paragraph);
//# sourceMappingURL=index.js.map