import React, { memo, useState, } from "react";
import { buildClassNames, } from "../lib/helpers";
import Animation from "../Animation";
import Attn from "../icons/Attn";
import Ex from "../icons/Ex";
import Err from "../icons/Err";
import Info from "../icons/Info";
import Success from "../icons/Success";
import IconButton from "../IconButton";
import Text from "../Text";
import { useMessageRemover, } from "./hooks";
const DEFAULT_DURATION = 3000;
function Toast({ alignment, id, body, duration = DEFAULT_DURATION, eventName, isBottom, isDismissible, type, }) {
    const [shouldShow, setShouldShow] = useState(true);
    const animType = shouldShow ? "fadeIn" : "fadeOut";
    const slideIn = isBottom ? "up" : "down";
    const slideOut = isBottom ? "down" : "up";
    const animDirection = shouldShow ? slideIn : slideOut;
    const isSuccess = type === "success";
    const isError = type === "error";
    const isWarning = type === "warning";
    const isInfo = type === "info";
    const Icon = isSuccess ? Success
        : isError ? Err
            : isWarning ? Attn
                : isInfo ? Info
                    : null;
    const removeMessage = useMessageRemover(eventName, id, duration, setShouldShow);
    const typeClasses = buildClassNames({
        isSuccess,
        isError,
        isWarning,
        isInfo,
    });
    const alignClasses = buildClassNames({
        isLX: alignment === "left",
        isCX: alignment === "center",
        isRX: alignment === "right",
    });
    return (React.createElement(Animation, { className: `qmToast ${alignClasses} ${typeClasses}`, type: animType, direction: animDirection, removeOnHide: true },
        React.createElement("div", { className: "qmToastContentWrapper" },
            React.createElement("div", { className: `qmToastContent ${typeClasses}` },
                Icon && (React.createElement(Icon, { className: `qmToastIcon ${typeClasses}`, size: "l" })),
                React.createElement(Text, { className: "qmToastText", text: body }),
                isDismissible && (React.createElement(IconButton, { className: "qmToastClearButton", clickHandler: removeMessage },
                    React.createElement(Ex, { size: "s" })))))));
}
Toast.displayName = "Toast";
export default memo(Toast);
//# sourceMappingURL=Toast.js.map