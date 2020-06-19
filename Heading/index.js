import "./styles.css";
import React, { memo, } from "react";
import Space from "../Space";
import Text from "../Text";
function Heading({ children, className, size, text, }) {
    return (React.createElement(Space, { className: `qmHeadingContainer ${className || ""}`, bottom: "i" },
        React.createElement(Text, { isBlock: true, isBold: true, className: `qmHeading isH${size}`, tag: `h${size}`, text: text }, children)));
}
Heading.displayName = "Heading";
export default memo(Heading);
//# sourceMappingURL=index.js.map