import React, { forwardRef, memo, } from "react";
import IconWrapper from "./IconWrapper";
const Dot = forwardRef(function (props, ref) {
    return (React.createElement(IconWrapper, Object.assign({}, props, { disableStroke: true, ref: ref, title: props.title || "Dot icon" }),
        React.createElement("circle", { cx: "4", cy: "4", r: "1" })));
});
Dot.displayName = "Dot";
export default memo(Dot);
//# sourceMappingURL=Dot.js.map