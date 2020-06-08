import "./styles.css";
import React, { memo, } from "react";
import { buildClassNames } from "../lib/helpers";
import Space from "../Space";
function Align({ children, className, justify = "left", bottomSpace, leftSpace, rightSpace, topSpace, }) {
    const childArray = !children ? [] : (Array.isArray(children) ? children : [children]);
    const justifyClasses = buildClassNames({
        isCenter: justify === "center",
        isLeft: justify === "left",
        isRight: justify === "right",
    });
    return (React.createElement(Space, { bottom: bottomSpace, left: leftSpace, right: rightSpace, top: topSpace, className: `qmAlignContainer ${justifyClasses} ${className || ""}` }, childArray.map((child, index) => (React.createElement("div", { className: "qmAlignItem", key: index }, child)))));
}
Align.displayName = "Align";
export default memo(Align);
//# sourceMappingURL=index.js.map