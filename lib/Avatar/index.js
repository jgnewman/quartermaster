import React from "react";
import SmileIcon from "../icons/SmileIcon";
import { StyledAvatarSpan, StyledActivitySpan, StyledAvatarContentSpan, } from "./styles";
function Avatar(_a) {
    var className = _a.className, isActive = _a.isActive, showActivity = _a.showActivity, url = _a.url;
    var style = {};
    if (url) {
        style.backgroundImage = "url(" + url + ")";
    }
    return (React.createElement(StyledAvatarSpan, { className: "qm-avatar " + (className || "") },
        React.createElement(StyledAvatarContentSpan, { className: "qm-avatar-content", style: style }, !url && (React.createElement(SmileIcon, { className: "qm-avatar-default-img" }))),
        showActivity && (React.createElement(StyledActivitySpan, { className: "qm-avatar-activity " + (isActive ? "is-active" : ""), isActive: !!isActive }))));
}
Avatar.displayName = "Avatar";
export default Avatar;
//# sourceMappingURL=index.js.map