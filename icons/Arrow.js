import React, { forwardRef, memo, } from "react";
import IconWrapper from "./IconWrapper";
const Arrow = forwardRef(function (props, ref) {
    return (React.createElement(IconWrapper, Object.assign({ ref: ref, title: props.title || "Arrow icon" }, props),
        React.createElement("polyline", { points: "3.5 1.5 1 4 3.5 6.5" }),
        React.createElement("path", { d: "M1,4 L6.75,4" })));
});
Arrow.displayName = "Arrow";
export default memo(Arrow);
//# sourceMappingURL=Arrow.js.map