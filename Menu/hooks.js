import { useCallback, useEffect, } from "react";
import { elemInEventPath, } from "../lib/helpers";
export function useSubmenuClickHandler(isOpen, menuKey, menuState, setMenuState) {
    return useCallback(function (evt) {
        evt.stopPropagation();
        setMenuState(Object.assign(Object.assign({}, menuState), { [menuKey]: {
                isOpen: !isOpen,
                hasToggled: true,
            } }));
    }, [
        isOpen,
        menuKey,
        menuState,
        setMenuState,
    ]);
}
export function useSubmenuKeyHandler(clickHandler) {
    return useCallback(function (evt) {
        if (evt.key === "Enter" || evt.key === " ") {
            evt.preventDefault();
            clickHandler(evt);
        }
    }, [clickHandler]);
}
export function useCloseSubMenuOnBlur(menuKey, menuState, setMenuState, submenuRef) {
    const { isOpen } = menuState[menuKey];
    const focusWatcher = useCallback(function () {
        const { current: currentSubmenu } = submenuRef;
        if (!isOpen || !currentSubmenu) {
            return;
        }
        if (!currentSubmenu.contains(document.activeElement)) {
            setMenuState(Object.assign(Object.assign({}, menuState), { [menuKey]: {
                    isOpen: false,
                    hasToggled: true,
                } }));
        }
    }, [
        isOpen,
        menuKey,
        menuState,
        setMenuState,
        submenuRef,
    ]);
    return useEffect(function () {
        document.addEventListener('focusin', focusWatcher);
        return function () {
            document.removeEventListener('focusin', focusWatcher);
        };
    }, [focusWatcher]);
}
export function useCloseMenuOnClickAway(menuRef, setState, state) {
    const closeOnClickAway = useCallback(function (evt) {
        const { current: currentMenuRef } = menuRef;
        if (elemInEventPath(currentMenuRef, evt)) {
            return;
        }
        const newState = {};
        Object.keys(state).forEach(key => {
            const { isOpen, hasToggled } = state[key];
            if (isOpen && hasToggled) {
                newState[key] = { isOpen: false, hasToggled };
            }
            else if (state[key]) {
                newState[key] = Object.assign({}, state[key]);
            }
        });
        setState(Object.assign(Object.assign({}, state), newState));
    }, [
        menuRef,
        state,
        setState,
    ]);
    useEffect(function () {
        document.addEventListener("click", closeOnClickAway);
        return function () {
            document.removeEventListener("click", closeOnClickAway);
        };
    }, [closeOnClickAway]);
}
//# sourceMappingURL=hooks.js.map