import React, { forwardRef, memo, } from "react";
import IconWrapper from "./IconWrapper";
const Meatballs = forwardRef(function (props, ref) {
    return (React.createElement(IconWrapper, Object.assign({}, props, { disableStroke: true, ref: ref, title: props.title || "Meatballs icon" }),
        React.createElement("circle", { className: "qmPathIsFilled", cx: "4", cy: "4", r: "0.75" }),
        React.createElement("circle", { className: "qmPathIsFilled", cx: "0.75", cy: "4", r: "0.75" }),
        React.createElement("circle", { className: "qmPathIsFilled", cx: "7.25", cy: "4", r: "0.75" })));
});
Meatballs.displayName = "Meatballs";
export default memo(Meatballs);
//# sourceMappingURL=Meatballs.js.map