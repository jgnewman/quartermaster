import React, { forwardRef, memo, } from "react";
import IconWrapper from "./IconWrapper";
const Plus = forwardRef(function (props, ref) {
    return (React.createElement(IconWrapper, Object.assign({ ref: ref, title: props.title || "Plus icon" }, props),
        React.createElement("path", { d: "M4,1 L4,7" }),
        React.createElement("path", { d: "M4,1 L4,7", transform: "translate(4, 4) rotate(-90) translate(-4, -4)" })));
});
Plus.displayName = "Plus";
export default memo(Plus);
//# sourceMappingURL=Plus.js.map