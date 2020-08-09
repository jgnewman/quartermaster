import React, { forwardRef, memo, } from "react";
import { radiusMap } from "./helpers";
import IconWrapper from "./IconWrapper";
const Attn = forwardRef(function (props, ref) {
    const radius = radiusMap[props.size];
    return (React.createElement(IconWrapper, Object.assign({}, props, { ref: ref, title: props.title || "Attn icon" }),
        React.createElement("circle", { className: "qmPathIsFilled", stroke: "none", cx: "4", cy: "6", r: radius }),
        React.createElement("path", { d: "M4,3.5 L4,4.75" }),
        React.createElement("polygon", { points: "4 0.5 0.5 7.5 7.5 7.5" })));
});
Attn.displayName = "Attn";
export default memo(Attn);
//# sourceMappingURL=Attn.js.map