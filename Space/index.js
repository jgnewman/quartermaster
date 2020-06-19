import "./styles.css";
import React, { memo, } from "react";
const sizeMap = {
    xs: "0.25em",
    s: "0.5em",
    m: "0.75em",
    i: "1em",
    l: "1.5em",
    xl: "2em",
};
function Space({ children, className, bottom, left, right, top, }) {
    const style = {
        paddingTop: top ? sizeMap[top] : 0,
        paddingRight: right ? sizeMap[right] : 0,
        paddingBottom: bottom ? sizeMap[bottom] : 0,
        paddingLeft: left ? sizeMap[left] : 0,
    };
    return (React.createElement("div", { className: `qmSpaceContainer ${className || ""}`, style: style }, children));
}
Space.displayName = "Space";
export default memo(Space);
//# sourceMappingURL=index.js.map