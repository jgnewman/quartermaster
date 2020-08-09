import React, { forwardRef, memo, } from "react";
import IconWrapper from "./IconWrapper";
const Success = forwardRef(function (props, ref) {
    return (React.createElement(IconWrapper, Object.assign({ ref: ref, title: props.title || "Success icon" }, props),
        React.createElement("circle", { cx: "4", cy: "4", r: "3.5" }),
        React.createElement("polyline", { points: "2.4 4.2625 3.48333333 5.5 5.65 2.75" })));
});
Success.displayName = "Success";
export default memo(Success);
//# sourceMappingURL=Success.js.map