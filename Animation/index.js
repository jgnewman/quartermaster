import "./styles.css";
import React, { forwardRef, memo, } from "react";
import { buildClassNames } from "../lib/helpers";
import { useDetachedElements } from "./hooks";
const DEFAULT_DURATION = 200;
const Animation = forwardRef(function ({ children, className, displayNoneOnHide = false, direction, duration = DEFAULT_DURATION, override, removeOnHide = false, style, type, }, ref) {
    const hasOverride = typeof override === "string";
    const isOverrideHide = override === "hide";
    const hasDirection = !!direction;
    const [isDetached, isRemoved] = useDetachedElements(displayNoneOnHide, duration, isOverrideHide, removeOnHide, type);
    if (isRemoved) {
        return null;
    }
    const animClasses = buildClassNames({
        isAnimating: !hasOverride,
        isDetached,
        isOverrideHide,
        isOverrideShow: override === "show",
        isFadeIn: !hasOverride && type === "fadeIn",
        isFadeOut: !hasOverride && type === "fadeOut",
        isStill: !hasDirection,
        isDown: !hasOverride && direction === "down",
        isLeft: !hasOverride && direction === "left",
        isRight: !hasOverride && direction === "right",
        isUp: !hasOverride && direction === "up",
    });
    const cssDuration = duration / 1000;
    const extendedStyle = Object.assign(Object.assign({}, style), { animationDuration: cssDuration + "s" });
    return (React.createElement("div", { className: `qmAnimationContainer ${animClasses} ${className || ""}`, ref: ref, style: extendedStyle }, children));
});
Animation.displayName = "Animation";
export default memo(Animation);
//# sourceMappingURL=index.js.map