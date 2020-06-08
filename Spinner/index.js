import "./styles.css";
import React, { memo } from "react";
import { sizeMap } from "../icons/helpers";
function Spinner({ className, size = "xxs", }) {
    const pxSize = sizeMap[size];
    let borderWidth;
    switch (size) {
        case "xxs":
        case "xs":
            borderWidth = 1;
            break;
        case "s":
        case "m":
        case "i":
        case "l":
            borderWidth = 2;
            break;
        case "xl":
        case "xxl":
        default:
            borderWidth = 3;
    }
    const spinnerStyle = {
        width: `${pxSize}px`,
        height: `${pxSize}px`,
        borderWidth: `${borderWidth}px`,
    };
    return (React.createElement("span", { className: `qmSpinnerContainer ${className || ""}`, style: spinnerStyle }));
}
Spinner.displayName = "Spinner";
export default memo(Spinner);
//# sourceMappingURL=index.js.map