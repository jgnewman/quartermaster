import React, { forwardRef, memo, } from "react";
import IconWrapper from "./IconWrapper";
const Ex = forwardRef(function (props, ref) {
    return (React.createElement(IconWrapper, Object.assign({ ref: ref, title: props.title || "Ex icon" }, props),
        React.createElement("path", { d: "M4,0.5 L4,7.5", transform: "translate(4, 4) rotate(45) translate(-4, -4)" }),
        React.createElement("path", { d: "M4,0.5 L4,7.5", transform: "translate(4, 4) rotate(-45) translate(-4, -4)" })));
});
Ex.displayName = "Ex";
export default memo(Ex);
//# sourceMappingURL=Ex.js.map