import React, { forwardRef, memo, } from "react";
import IconWrapper from "./IconWrapper";
const Err = forwardRef(function (props, ref) {
    return (React.createElement(IconWrapper, Object.assign({ ref: ref, title: props.title || "Err icon" }, props),
        React.createElement("circle", { cx: "4", cy: "4", r: "3.5" }),
        React.createElement("path", { d: "M4,2 L4,6", transform: "translate(4, 4) rotate(45) translate(-4, -4)" }),
        React.createElement("path", { d: "M4,2 L4,6", transform: "translate(4, 4) rotate(-45) translate(-4, -4)" })));
});
Err.displayName = "Err";
export default memo(Err);
//# sourceMappingURL=Err.js.map