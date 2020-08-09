import "./styles.css";
import React, { forwardRef, memo, } from "react";
import Button from "../Button";
import { noopEvtHandler } from "../lib/helpers";
const IconButton = forwardRef(function ({ children, className = "", clickHandler = noopEvtHandler, href, tag, }, ref) {
    return (React.createElement("span", { className: `qmIconButtonContainer ${className}` },
        React.createElement("span", { className: "qmIconButtonEffect" }),
        React.createElement(Button, { className: "qmIconButton", clickHandler: clickHandler, href: href, tag: tag, ref: ref }, children)));
});
IconButton.displayName = "IconButton";
export default memo(IconButton);
//# sourceMappingURL=index.js.map