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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { PureComponent, } from "react";
import { noopEvtHandler } from "../lib/noops";
import { StyledAnchor, StyledButton } from "./styles";
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Button.prototype.render = function () {
        var _a = this.props, children = _a.children, className = _a.className, clickHandler = _a.clickHandler, isDisabled = _a.isDisabled, isProcessing = _a.isProcessing, tag = _a.tag, text = _a.text;
        var buttonClickHandler = clickHandler || noopEvtHandler;
        var shouldApplyClickHandler = !!clickHandler && !isDisabled && !isProcessing;
        var dynamicProps = {};
        if (shouldApplyClickHandler) {
            dynamicProps.onClick = buttonClickHandler;
        }
        if (!!isDisabled || isProcessing) {
            dynamicProps.disabled = true;
        }
        dynamicProps.className =
            "qm-button " + (isDisabled ? "is-disabled" : "") + " " + (isProcessing ? "is-processing" : "") + " " + (className || "");
        var content = (React.createElement("span", { className: "qm-button-content" },
            text,
            children));
        switch (tag) {
            case "a":
                return (React.createElement(StyledAnchor, __assign({}, dynamicProps), content));
            case "button":
            default:
                return (React.createElement(StyledButton, __assign({}, dynamicProps), content));
        }
    };
    Button.displayName = "Button";
    return Button;
}(PureComponent));
export default Button;
//# sourceMappingURL=index.js.map