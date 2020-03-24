var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import React, { Component } from "react";
import { noopEvtHandler } from "../lib/noops";
import Button from "../Button";
import Modal from "../Modal";
var ConfirmButton = /** @class */ (function (_super) {
    __extends(ConfirmButton, _super);
    function ConfirmButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { open: false };
        return _this;
    }
    ConfirmButton.prototype.openConfirmation = function () {
        this.setState({ open: true });
    };
    ConfirmButton.prototype.closeConfirmation = function () {
        this.setState({ open: false });
    };
    ConfirmButton.prototype.render = function () {
        var _this = this;
        var _a = this.props, children = _a.children, className = _a.className, clickHandler = _a.clickHandler, confirmationCancelText = _a.confirmationCancelText, confirmationContinueText = _a.confirmationContinueText, confirmationText = _a.confirmationText, isDisabled = _a.isDisabled, isProcessing = _a.isProcessing, tag = _a.tag, text = _a.text;
        var buttonClickHandler = function (evt) {
            evt.preventDefault();
            _this.openConfirmation();
        };
        var confirmationContinueHandler = function (evt) {
            evt.preventDefault();
            _this.closeConfirmation();
            return (clickHandler || noopEvtHandler)(evt);
        };
        var confirmationCancelHandler = function (evt) {
            evt.preventDefault();
            _this.closeConfirmation();
        };
        return (React.createElement(React.Fragment, null,
            React.createElement(Button, { tag: tag, text: text, className: className, isDisabled: isDisabled, isProcessing: isProcessing, clickHandler: buttonClickHandler }, children),
            React.createElement(Modal, { className: "qm-confirm-button-modal", hideCloseButton: true, isOpen: this.state.open },
                React.createElement("h2", { className: "qm-confirm-button-title" }, confirmationText || "Are you sure?"),
                React.createElement("div", { className: "qm-confirm-button-options" },
                    React.createElement(Button, { className: "qm-confirm-button-continue", clickHandler: confirmationContinueHandler }, confirmationContinueText || "Yes"),
                    React.createElement(Button, { className: "qm-confirm-button-cancel", clickHandler: confirmationCancelHandler }, confirmationCancelText || "Nevermind")))));
    };
    ConfirmButton.displayName = "ConfirmButton";
    return ConfirmButton;
}(Component));
export default ConfirmButton;
//# sourceMappingURL=index.js.map