import React, { forwardRef, memo, } from "react";
import IconWrapper from "./IconWrapper";
const Calendar = forwardRef(function (props, ref) {
    return (React.createElement(IconWrapper, Object.assign({ ref: ref, title: props.title || "Calendar icon" }, props),
        React.createElement("circle", { className: "qmPathIsFilled qmPathIsNoStroke", cx: "4", cy: "4.75", r: "1" }),
        React.createElement("path", { d: "M2.5,0.5 L2.5,2.5" }),
        React.createElement("path", { d: "M5.5,0.5 L5.5,2.5" }),
        React.createElement("rect", { x: "0.5", y: "1.5", width: "7", height: "6" })));
});
Calendar.displayName = "Calendar";
export default memo(Calendar);
//# sourceMappingURL=Calendar.js.map