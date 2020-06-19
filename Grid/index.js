import "./styles.css";
import React, { memo, } from "react";
import { buildClassNames } from "../lib/helpers";
import Space from "../Space";
export const Grow = memo(function ({ children, className, size, }) {
    const containerClasses = buildClassNames({
        isStatic: size === 0,
        isSingle: size === 1,
        isDouble: size === 2,
        isTriple: size === 3,
    });
    return (React.createElement("div", { className: `qmGrowContainer ${containerClasses} ${className || ""}` }, children));
});
Grow.displayName = "Grow";
function Grid({ bottomSpace, children, className, equalHeight, gutterH, gutterW, justify = "between", leftSpace, rightSpace, topSpace, wrap, }) {
    const containerClasses = buildClassNames({
        hasWrap: wrap,
        isAround: justify === "around",
        isBetween: justify === "between",
        isCenter: justify === "center",
        isEnd: justify === "end",
        isEven: justify === "even",
        isGutterHXL: gutterH === "xl",
        isGutterHL: gutterH === "l",
        isGutterHI: gutterH === "i",
        isGutterHM: gutterH === "m",
        isGutterHS: gutterH === "s",
        isGutterHXS: gutterH === "xs",
        isGutterWXL: gutterW === "xl",
        isGutterWL: gutterW === "l",
        isGutterWI: gutterW === "i",
        isGutterWM: gutterW === "m",
        isGutterWS: gutterW === "s",
        isGutterWXS: gutterW === "xs",
        isStart: justify === "start",
        isStretch: equalHeight,
    });
    return (React.createElement(Space, { bottom: bottomSpace, left: leftSpace, right: rightSpace, top: topSpace, className: "qmGridSpacer" },
        React.createElement("div", { className: `qmGridContainer ${containerClasses} ${className || ""}` }, children)));
}
Grid.displayName = "Grid";
export default memo(Grid);
//# sourceMappingURL=index.js.map