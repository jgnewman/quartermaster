import React, { forwardRef, memo, } from "react";
import IconWrapper from "./IconWrapper";
const pathData = [
    "M0.596839878,2.58937968 C0.534834345,2.52463263 0.5,2.43681678 0.5,2.34525062",
    "C0.5,2.15457397 0.648029,2 0.830632024,2 L7.16936798,2 C7.25705704,2 7.34115459,2.03637451",
    "7.40316012,2.10112157 C7.53227996,2.23595032 7.53227996,2.45455093 7.40316012,2.58937968",
    "L4.23379215,5.89887843 C4.10467231,6.03370719 3.89532769,6.03370719 3.76620785,5.89887843",
    "L0.596839878,2.58937968 Z",
].join(" ");
const Triangle = forwardRef(function (props, ref) {
    return (React.createElement(IconWrapper, Object.assign({}, props, { disableStroke: true, ref: ref, title: props.title || "Triangle icon" }),
        React.createElement("path", { className: "qmPathIsFilled", d: pathData })));
});
Triangle.displayName = "Triangle";
export default memo(Triangle);
//# sourceMappingURL=Triangle.js.map