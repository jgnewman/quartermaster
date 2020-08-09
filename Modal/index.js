import "./styles.css";
import React, { memo, } from "react";
import { buildClassNames, noopEvtHandler, } from "../lib/helpers";
import { useScrollHandling, } from "../lib/internalHooks";
import IconButton from "../IconButton";
import Ex from "../icons/Ex";
function Modal({ children, className, closeHandler, hideCloseButton, isOpen, }) {
    const isClosed = !isOpen;
    useScrollHandling(isOpen);
    const containerClasses = buildClassNames({
        isClosed,
        isOpen,
    });
    return (React.createElement("div", { className: `qmModalContainer ${containerClasses} ${className || ""}` },
        !hideCloseButton && (React.createElement("div", { className: "qmModalCloseWrapper" },
            React.createElement(IconButton, { className: "qmModalClose", clickHandler: closeHandler || noopEvtHandler },
                React.createElement(Ex, { size: "m" })))),
        React.createElement("div", { className: "qmModalContent" }, children)));
}
Modal.displayName = "Modal";
export default memo(Modal);
//# sourceMappingURL=index.js.map