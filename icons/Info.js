import React, { forwardRef, memo, } from "react";
import { radiusMap } from "./helpers";
import IconWrapper from "./IconWrapper";
const Info = forwardRef(function (props, ref) {
    const radius = radiusMap[props.size];
    return (React.createElement(IconWrapper, Object.assign({}, props, { ref: ref, title: props.title || "Info icon" }),
        React.createElement("path", { d: "M4,3.75 L4,5.75" }),
        React.createElement("circle", { cx: "4", cy: "4", r: "3.5" }),
        React.createElement("circle", { className: "qmPathIsFilled", stroke: "none", cx: "4", cy: "2.25", r: radius })));
});
Info.displayName = "Info";
export default memo(Info);
//# sourceMappingURL=Info.js.map