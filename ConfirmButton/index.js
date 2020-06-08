var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import "./styles.css";
import React, { forwardRef, memo, } from "react";
import Align from "../Align";
import Button from "../Button";
import Modal from "../Modal";
import { useOpenStateHandlers, useModalRenderLogic, } from "./hooks";
const ConfirmButton = forwardRef(function (_a, ref) {
    var { cancelText, children, clickHandler, confirmationText, continueText, disableHighlights, postCancelHook, skipConfirmation = false, useCompactModalButtons } = _a, rest = __rest(_a, ["cancelText", "children", "clickHandler", "confirmationText", "continueText", "disableHighlights", "postCancelHook", "skipConfirmation", "useCompactModalButtons"]);
    const { isOpen, handleClick, handleContinue, handleCancel, } = useOpenStateHandlers(skipConfirmation, clickHandler, postCancelHook);
    const shouldRenderModal = useModalRenderLogic(skipConfirmation);
    const buttonProps = Object.assign(Object.assign({}, rest), { clickHandler: handleClick, ref: ref });
    const positiveProps = {};
    if (!disableHighlights) {
        positiveProps.highlight = "positive";
    }
    const negativeProps = {};
    if (!disableHighlights) {
        negativeProps.highlight = "negative";
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(Button, Object.assign({}, buttonProps), children),
        shouldRenderModal && (React.createElement(Modal, { className: "qmConfButtonModal", hideCloseButton: true, isOpen: isOpen },
            React.createElement("h2", { className: "qmConfButtonTitle" }, confirmationText || "Are you sure?"),
            React.createElement("div", { className: "qmConfButtonOptions" },
                React.createElement(Align, null,
                    React.createElement(Button, Object.assign({ className: "qmConfButtonContinue", clickHandler: handleContinue, isCompact: !!useCompactModalButtons }, positiveProps), continueText || "Yes"),
                    React.createElement(Button, Object.assign({ className: "qmConfButtonCancel", clickHandler: handleCancel, isCompact: !!useCompactModalButtons }, negativeProps), cancelText || "Nevermind")))))));
});
ConfirmButton.displayName = "ConfirmButton";
export default memo(ConfirmButton);
//# sourceMappingURL=index.js.map