/**
 * Theme
 *
 * Takes data describing how to build a stylesheet.
 * Builds and injects the stylesheet on mount.
 * Removes the stylesheet on unmount.
 *
 * <Theme
 *   data={{
 *     "background": {
 *       "#000000": `
 *         .foo,
 *         .bar.baz,
 *         #quux[disabled]
 *       `
 *     },
 *     "border-radius": {
 *       "50%": `.foo, .bar.baz, #quux[disabled]`
 *     }
 *   }}
 * />
 */
import React, { memo, useCallback, useEffect, useMemo, useState, } from "react";
import { useId, usePrevious, } from "../hooks";
function buildCSSChunk(propName, propSpec) {
    return Object.keys(propSpec).map(color => {
        const selector = propSpec[color]
            .trim()
            .replace(/,$/, "") // forgive trailing commas on selectors
            .replace(/\n\s*/g, "\n"); // remove indentation in template strings
        return `${selector} {\n${propName}: ${color};\n}`;
    }).join("\n");
}
function buildCSSStyles(data) {
    if (!data) {
        return "";
    }
    return Object.keys(data).map(propName => {
        return `${buildCSSChunk(propName, data[propName])}\n`;
    }).join("");
}
function removeStyleTag(tag) {
    var _a;
    (_a = tag.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(tag);
}
function createStyleTag(id) {
    const styleTag = document.createElement("style");
    styleTag.setAttribute("type", "text/css");
    styleTag.setAttribute("id", id);
    return styleTag;
}
function useStyleUpdater(data, prevData, prevStyles, setPrevStyles, tag) {
    return useCallback(function () {
        if (data === prevData) {
            return;
        }
        const newStyles = buildCSSStyles(data);
        if (newStyles !== prevStyles) {
            tag.innerHTML = newStyles;
            setPrevStyles(newStyles);
        }
    }, [
        data,
        prevData,
        prevStyles,
        setPrevStyles,
        tag,
    ]);
}
function useKeepStylesUpdated(data, updateStyles) {
    useEffect(function () {
        updateStyles();
    }, [data, updateStyles]);
}
function useRemoveStylesOnTagChange(tag) {
    const prevTag = usePrevious(tag);
    useEffect(function () {
        return function () {
            if (prevTag && prevTag !== tag) {
                removeStyleTag(prevTag);
            }
        };
    }, [prevTag, tag]);
}
function Theme({ children, data }) {
    const prevData = usePrevious(data);
    const id = useId();
    const tag = useMemo(() => createStyleTag(id), [id]);
    const [stylesInjected, setStylesInjected] = useState(false);
    const [prevStyles, setPrevStyles] = useState("");
    const updateStyles = useStyleUpdater(data, prevData !== null && prevData !== void 0 ? prevData : null, prevStyles, setPrevStyles, tag);
    if (!stylesInjected) {
        document.head.appendChild(tag);
        updateStyles();
        setStylesInjected(true);
    }
    useKeepStylesUpdated(data, updateStyles);
    useRemoveStylesOnTagChange(tag);
    if (!stylesInjected) {
        return null;
    }
    return (React.createElement(React.Fragment, null, children));
}
Theme.displayName = "Theme";
export default memo(Theme);
//# sourceMappingURL=index.js.map