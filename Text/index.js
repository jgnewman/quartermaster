import "./styles.css";
import { createElement, memo, } from "react";
import { buildClassNames } from "../lib/helpers";
function Text({ children, className, htmlFor, isBlock, isBold, isSmaller, isSmallest, isUppercase, tag = "span", text, title, }) {
    const dynamicProps = {};
    if (htmlFor) {
        dynamicProps.htmlFor = htmlFor;
    }
    if (title) {
        dynamicProps.title = title;
    }
    const containerClasses = buildClassNames({
        isBlock,
        isBold,
        isUppercase,
        [isSmallest ? "isSmallest" : "isSmaller"]: isSmallest || isSmaller,
    });
    return createElement(tag, Object.assign({ className: `qmTextContainer ${containerClasses} ${className || ""}` }, dynamicProps), text || children);
}
Text.displayName = "Text";
export default memo(Text);
//# sourceMappingURL=index.js.map