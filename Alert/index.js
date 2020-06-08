import "./styles.css";
import React, { memo, } from "react";
import { buildClassNames } from "../lib/helpers";
import Grid, { Grow } from "../Grid";
import Text from "../Text";
import Attn from "../icons/Attn";
import Info from "../icons/Info";
function Alert({ children, className, text, type, }) {
    const isDanger = type === "danger";
    const isInfo = type === "info";
    const isWarning = type === "warning";
    const typeClass = buildClassNames({ isDanger, isInfo, isWarning });
    const IconComponent = isDanger || isWarning ? Attn : Info;
    return (React.createElement("div", { className: `qmAlertContainer ${typeClass} ${className || ""}` },
        React.createElement(Grid, { className: `qmAlertGrid ${typeClass}`, gutterW: "m" },
            React.createElement(Grow, { size: 0, className: "qmAlertIconWrapper" },
                React.createElement(IconComponent, { className: `qmAlertIcon ${typeClass}`, size: "i" })),
            React.createElement(Grow, { size: 2, className: "qmAlertContent" },
                text && React.createElement(Text, { isBlock: true }, text),
                children))));
}
Alert.displayName = "Alert";
export default memo(Alert);
//# sourceMappingURL=index.js.map