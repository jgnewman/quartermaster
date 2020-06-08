import "./styles.styl";
import React, { forwardRef, memo, } from "react";
import { sizeMap, strokeMap } from "./helpers";
const IconWrapper = forwardRef(function ({ children, className = "", disableStroke, rotate, size, title, }, ref) {
    const pxSize = sizeMap[size];
    const strokeWidth = strokeMap[size];
    const svgStyle = {
        width: `${pxSize}px`,
        height: `${pxSize}px`,
    };
    if (rotate) {
        svgStyle.transform = `rotate(${rotate || 0}deg)`;
    }
    return (React.createElement("svg", { className: `qmIcon isSize${size.toUpperCase()} ${disableStroke ? "isNoStroke" : ""} ${className}`, style: svgStyle, width: pxSize, height: pxSize, viewBox: "0 0 8 8", version: "1.1", xmlns: "http://www.w3.org/2000/svg", fillRule: "evenodd", stroke: "inherit", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: strokeWidth, ref: ref },
        React.createElement("title", null, title || "SVG Icon"),
        React.createElement("rect", { fill: "transparent", strokeWidth: "0", x: "0", y: "0", width: "8", height: "8" }),
        children));
});
IconWrapper.displayName = "Plus";
export default memo(IconWrapper);
//# sourceMappingURL=IconWrapper.js.map