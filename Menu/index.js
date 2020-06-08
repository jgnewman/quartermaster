import "./styles.css";
import React, { memo, useCallback, useEffect, useRef, useState, } from "react";
import { buildClassNames } from "../lib/helpers";
import Animation from "../Animation";
import Space from "../Space";
import Triangle from "../icons/Triangle";
import { getInitialSubmenuState, genAnimProps } from "./helpers";
import MenuLabel from "./MenuLabel";
import MenuLink from "./MenuLink";
import MenuSeparator from "./MenuSeparator";
function useSubmenuClickHandler(isOpen, menuKey, menuState, setMenuState) {
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
const Submenu = memo(function ({ animate, childIsLifted, data, isCollapsible, isCompact, maxWidth, menuKey, menuState, minWidth, parentIsLifted, posX = "right", posY = "bottom", setMenuState, startOpen, text, }) {
    const isLifted = typeof childIsLifted === "boolean" ? childIsLifted : !!parentIsLifted;
    const { isOpen, hasToggled } = menuState[menuKey];
    const smallPad = isCompact ? "xs" : "s";
    const largePad = isCompact ? "m" : "l";
    const clickHandler = useSubmenuClickHandler(isOpen, menuKey, menuState, setMenuState);
    const animProps = animate === true ? true : !animate ? false : {
        type: isOpen ? "fadeIn" : "fadeOut",
    };
    if (typeof animate === "object" && typeof animProps === "object") {
        if (isOpen && animate.inDirection) {
            animProps.direction = animate.inDirection;
        }
        if (isOpen && animate.inDuration) {
            animProps.duration = animate.inDuration;
        }
        if (!isOpen && animate.outDirection) {
            animProps.direction = animate.outDirection;
        }
        if (!isOpen && animate.outDuration) {
            animProps.duration = animate.outDuration;
        }
        if (startOpen && !hasToggled) {
            animProps.override = "show";
        }
        if (!startOpen && !hasToggled) {
            animProps.override = "hide";
        }
        animProps.displayNoneOnHide = true;
    }
    const canAnimate = !!animProps;
    const isMenuBottom = posY === "bottom";
    const isMenuTop = !isMenuBottom;
    const buttonClasses = buildClassNames({
        isCollapsible,
    });
    const iconClasses = buildClassNames({
        isCompact,
        isFlipped: (isOpen && isMenuBottom) || (!isOpen && isMenuTop),
    });
    const menuClasses = buildClassNames({
        canAnimate,
        isCollapsible,
        isMenuBottom,
        isMenuLeft: posX === "left",
        isMenuRight: posX === "right",
        isMenuTop,
    });
    return (React.createElement("div", { className: `qmMenuSubmenuLink ${buttonClasses}`, onClick: clickHandler },
        React.createElement(Space, { className: "qmMenuLinkContent", top: smallPad, right: largePad, bottom: smallPad, left: largePad },
            React.createElement("span", { className: "qmMenuLinkText" }, text),
            canAnimate && (React.createElement(Triangle, { className: `qmMenuSubmenuIcon ${iconClasses}`, size: "s" }))),
        React.createElement(Menu, { className: `qmMenuSubmenu ${menuClasses}`, animate: animProps, data: data, isCompact: isCompact, isLifted: isLifted, isOpen: isOpen, maxWidth: maxWidth, minWidth: minWidth })));
});
Submenu.displayName = "Submenu";
function useCloseMenuOnClickAway(menuRef, setState, state) {
    const closeOnClickAway = useCallback(function (evt) {
        const { current: currentMenuRef } = menuRef;
        const refExists = !!currentMenuRef;
        const refInPath = refExists && evt.path.includes(currentMenuRef);
        if (refInPath) {
            return;
        }
        const newState = {};
        Object.keys(state).forEach(key => {
            const { isOpen, hasToggled } = state[key];
            if (isOpen && hasToggled) {
                newState[key] = { isOpen: false, hasToggled };
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
function Menu({ animate, className, data, isCompact, isLifted, isOpen, minWidth, maxWidth, }) {
    const menuRef = useRef(null);
    const [state, setState] = useState(getInitialSubmenuState(data));
    useCloseMenuOnClickAway(menuRef, setState, state);
    const animProps = genAnimProps(animate, isOpen);
    const style = {
        minWidth: minWidth || "initial",
        maxWidth: maxWidth || "initial",
    };
    const helperClasses = buildClassNames({
        isCompact,
        isLifted,
        isOpen,
    });
    return (React.createElement(Animation, Object.assign({ ref: menuRef, className: `qmMenuContainer ${helperClasses} ${className || ""}`, style: style }, animProps), data.map((item, index) => {
        switch (item.type) {
            case "label":
                return (React.createElement(MenuLabel, { key: index, isCompact: isCompact, text: item.text }));
            case "link":
                return (React.createElement(MenuLink, Object.assign({}, item, { key: index, isCompact: isCompact })));
            case "submenu":
                return (React.createElement(Submenu, Object.assign({}, item, { key: index, childIsLifted: item.isLifted, isCompact: isCompact, menuKey: item.key, menuState: state, parentIsLifted: isLifted, setMenuState: setState })));
            case "separator":
            default:
                return (React.createElement(MenuSeparator, { key: index, isCompact: isCompact }));
        }
    })));
}
Menu.displayName = "Menu";
export default memo(Menu);
//# sourceMappingURL=index.js.map