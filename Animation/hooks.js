import { useEffect, useState, } from "react";
export function useHider(isHidden, setHidden, shouldUseHider, isOverrideHide, duration, type) {
    useEffect(function () {
        if (!isHidden && shouldUseHider) {
            if (isOverrideHide) {
                setHidden(true);
            }
            else if (type === "fadeOut") {
                setTimeout(() => setHidden(true), duration);
            }
        }
        if (isHidden && (!shouldUseHider || type === "fadeIn")) {
            setHidden(false);
        }
    }, [
        isHidden,
        isOverrideHide,
        shouldUseHider,
        setHidden,
        duration,
        type,
    ]);
}
export function useDetachedElements(displayNoneOnHide, duration, isOverrideHide, removeOnHide, type) {
    const [isDetached, setDetached] = useState(isOverrideHide);
    const [isRemoved, setRemoved] = useState(isOverrideHide);
    useHider(isDetached, setDetached, displayNoneOnHide, isOverrideHide, duration, type);
    useHider(isRemoved, setRemoved, removeOnHide, isOverrideHide, duration, type);
    return [isDetached, isRemoved];
}
//# sourceMappingURL=hooks.js.map