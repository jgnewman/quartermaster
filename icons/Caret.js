import React, { forwardRef, memo, } from "react";
import IconWrapper from "./IconWrapper";
const Caret = forwardRef(function (props, ref) {
    return (React.createElement(IconWrapper, Object.assign({ ref: ref, title: props.title || "Caret icon" }, props),
        React.createElement("polyline", { points: "1 2.5 4 5.5 7 2.5" })));
});
Caret.displayName = "Caret";
export default memo(Caret);
//# sourceMappingURL=Caret.js.map