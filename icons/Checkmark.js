import React, { forwardRef, memo, } from "react";
import IconWrapper from "./IconWrapper";
const Checkmark = forwardRef(function (props, ref) {
    return (React.createElement(IconWrapper, Object.assign({ ref: ref, title: props.title || "Checkmark icon" }, props),
        React.createElement("polyline", { points: "1 4.25 3 6.5 7 1.5" })));
});
Checkmark.displayName = "Checkmark";
export default memo(Checkmark);
//# sourceMappingURL=Checkmark.js.map