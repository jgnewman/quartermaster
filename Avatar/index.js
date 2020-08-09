import "./styles.css";
import React, { memo, useMemo, } from "react";
import { buildClassNames } from "../lib/helpers";
function useInitials(rawName) {
    return useMemo(function () {
        var _a, _b;
        const [chunk1, chunk2] = rawName.split(/\s+/);
        return `${((_a = chunk1[0]) === null || _a === void 0 ? void 0 : _a.toUpperCase()) || ""}${((_b = (chunk2 ? chunk2[0] : chunk1[1])) === null || _b === void 0 ? void 0 : _b.toUpperCase()) || ""}`;
    }, [rawName]);
}
function Avatar({ className, isActive, isCompact, name = "••", showActivity, url, }) {
    const style = {};
    if (url) {
        style.backgroundImage = `url(${url})`;
    }
    const initials = useInitials(name);
    const compactClass = buildClassNames({ isCompact });
    return (React.createElement("div", { className: `qmAvatarContainer ${compactClass} ${className || ""}` },
        React.createElement("span", { className: "qmAvatarContent" },
            React.createElement("span", { className: "qmAvatarInitials" }, initials),
            url && React.createElement("span", { className: "qmAvatarImg", style: style })),
        showActivity && React.createElement("span", { className: `qmAvatarIndicator ${compactClass} ${isActive ? "isActive" : ""}` })));
}
Avatar.displayName = "Avatar";
export default memo(Avatar);
//# sourceMappingURL=index.js.map