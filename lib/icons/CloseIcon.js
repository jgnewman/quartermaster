import React from "react";
var pathData = [
    "M1.36879397e-12,0.991173961 L0.991173961,2.23204788e-12 L12.637468,11.646294",
    "L11.646294,12.637468 L1.36879397e-12,0.991173961 Z M0.991173961,12.637468",
    "L1.56463731e-12,11.646294 L11.646294,4.20996571e-13 L12.637468,0.991173961",
    "L0.991173961,12.637468 Z",
].join(" ");
var CloseIcon = function (_a) {
    var className = _a.className, title = _a.title;
    return (React.createElement("svg", { className: "qm-icon qm-close-icon " + (className || ""), width: "13px", height: "13px", viewBox: "0 0 13 13", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("title", null, title || "Close symbol"),
        React.createElement("g", { stroke: "none", strokeWidth: "1", fill: "none", fillRule: "evenodd" },
            React.createElement("path", { fill: "#FFFFFF", fillRule: "nonzero", d: pathData }))));
};
CloseIcon.displayName = "CloseIcon";
export default CloseIcon;
//# sourceMappingURL=CloseIcon.js.map