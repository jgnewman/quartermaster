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
import React, { PureComponent, } from "react";
import { noopEvtHandler } from "../lib/noops";
import CloseIcon from "../icons/CloseIcon";
import { StyledModalDiv, StyledModalContentDiv, StyledCloseButton } from "./styles";
var Modal = /** @class */ (function (_super) {
    __extends(Modal, _super);
    function Modal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.body = window.document.body;
        _this.originalBodyHeight = _this.body.style.height;
        _this.originalBodyOverflow = _this.body.style.overflow;
        return _this;
    }
    Modal.prototype.disableScrolling = function () {
        this.originalBodyHeight = this.body.style.height;
        this.originalBodyOverflow = this.body.style.overflow;
        this.body.style.height = "100%";
        this.body.style.overflow = "hidden";
    };
    Modal.prototype.enableScrolling = function () {
        this.body.style.height = this.originalBodyHeight;
        this.body.style.overflow = this.originalBodyOverflow;
    };
    Modal.prototype.handleScrolling = function () {
        var isOpen = this.props.isOpen;
        if (isOpen) {
            this.disableScrolling();
        }
        else {
            this.enableScrolling();
        }
    };
    Modal.prototype.componentDidMount = function () {
        this.handleScrolling();
    };
    Modal.prototype.componentDidUpdate = function () {
        this.handleScrolling();
    };
    Modal.prototype.render = function () {
        var _a = this.props, children = _a.children, className = _a.className, closeHandler = _a.closeHandler, hideCloseButton = _a.hideCloseButton, isOpen = _a.isOpen;
        return (React.createElement(StyledModalDiv, { className: "qm-modal " + (isOpen ? "is-open" : "is-closed") + " " + (className || ""), isOpen: isOpen },
            !hideCloseButton && (React.createElement(StyledCloseButton, { className: "qm-modal-close-button", onClick: closeHandler || noopEvtHandler },
                React.createElement(CloseIcon, null))),
            React.createElement(StyledModalContentDiv, null, children)));
    };
    Modal.displayName = "Modal";
    return Modal;
}(PureComponent));
export default Modal;
//# sourceMappingURL=index.js.map