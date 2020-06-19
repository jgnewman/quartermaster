import "./styles.css";
import React, { memo } from "react";
import { buildClassNames } from "../lib/helpers";
function CharLimitCounter({ className, count, hideProgressBar, hideText, isCompact, isTextArea, limit, limitIsMinimum, }) {
    const isField = !isTextArea;
    const quarterMark = Math.round(limit / 4);
    const halfMark = Math.round(limit / 2);
    const threeQuarterMark = quarterMark * 3;
    let colorClass;
    if (limitIsMinimum) {
        if (count === 0) {
            colorClass = "empty";
        }
        else if (count < quarterMark) {
            colorClass = "worst";
        }
        else if (count < halfMark) {
            colorClass = "worse";
        }
        else if (count < threeQuarterMark) {
            colorClass = "decent";
        }
        else if (count < limit) {
            colorClass = "better";
        }
        else {
            colorClass = "best";
        }
    }
    else {
        if (count === 0) {
            colorClass = "empty";
        }
        else if (count < quarterMark) {
            colorClass = "best";
        }
        else if (count < halfMark) {
            colorClass = "better";
        }
        else if (count < threeQuarterMark) {
            colorClass = "decent";
        }
        else if (count <= limit) {
            colorClass = "worse";
        }
        else {
            colorClass = "error";
        }
    }
    const limitCountClasses = buildClassNames({
        hasCount: count > 0,
        hasError: colorClass === "error",
        reachedMin: limitIsMinimum && colorClass === "best",
    });
    const modClasses = buildClassNames({
        isField,
        isTextArea,
        isCompact,
    });
    const fillWidth = (count / limit) * 100;
    const styleWidth = fillWidth > 100 ? "100%" : `${fillWidth}%`;
    return (React.createElement("div", { className: `qmCharLimitContainer ${modClasses} ${className || ""}` },
        !hideText && (React.createElement("span", { className: `qmCharLimitText ${modClasses} ${colorClass}` },
            React.createElement("span", { className: `qmCharLimitCount ${limitCountClasses}` }, limitIsMinimum ? (count ? count : "") : (count || "0")),
            !limitIsMinimum && React.createElement("span", { className: "qmCharLimitDivider" }, " / "),
            !limitIsMinimum && React.createElement("span", { className: "qmCharLImitTotal" }, limit))),
        !hideProgressBar && (React.createElement("span", { className: `qmCharLimitBar ${modClasses}` },
            React.createElement("span", { className: `qmCharLimitBarFill ${colorClass}`, style: { width: styleWidth } })))));
}
CharLimitCounter.displayName = "CharLimitCounter";
export default memo(CharLimitCounter);
//# sourceMappingURL=CharLimitCounter.js.map