import React, { forwardRef, memo, } from "react";
import IconWrapper from "./IconWrapper";
const Hamburger = forwardRef(function (props, ref) {
    return (React.createElement(IconWrapper, Object.assign({ ref: ref, title: props.title || "Hamburger icon" }, props),
        React.createElement("path", { d: "M4,0.5 L4,7.5", transform: "translate(4, 4) rotate(-90) translate(-4, -4)" }),
        React.createElement("path", { d: "M4,-2 L4,5", transform: "translate(4, 1.5) rotate(-90) translate(-4, -1.5)" }),
        React.createElement("path", { d: "M4,3 L4,10", transform: "translate(4, 6.5) rotate(-90) translate(-4, -6.5)" })));
});
Hamburger.displayName = "Hamburger";
export default memo(Hamburger);
//# sourceMappingURL=Hamburger.js.map