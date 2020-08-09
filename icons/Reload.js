import React, { forwardRef, memo, } from "react";
import IconWrapper from "./IconWrapper";
const pathData = [
    "M1.75,7.13 C0.75,6.34823973 0.25,5.38823973 0.25,4.25 C0.25,2.5426404",
    "1.60526021,0.75 3.75,0.75 C5.89473979,0.75 7.25,2.5564157 7.25,4.25",
    "C7.25,5.9435843 6.25,6.75 5.59,7.25",
].join(" ");
const Reload = forwardRef(function (props, ref) {
    return (React.createElement(IconWrapper, Object.assign({ ref: ref, title: props.title || "Reload icon" }, props),
        React.createElement("path", { d: pathData, transform: "translate(3.75, 4) rotate(-90) translate(-3.75, -4)" }),
        React.createElement("polyline", { points: "7.5 0.5 7.5 2.5 5.5 2.5" })));
});
Reload.displayName = "Reload";
export default memo(Reload);
//# sourceMappingURL=Reload.js.map