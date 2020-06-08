import "./styles.css";
import React, { memo } from "react";
import { buildClassNames } from "../lib/helpers";
import Text from "../Text";
function Label({ className, htmlFor, isRequired, text, }) {
    const dynamicProps = {};
    if (htmlFor) {
        dynamicProps.htmlFor = htmlFor;
    }
    const containerClasses = buildClassNames({ isRequired });
    return (React.createElement(Text, Object.assign({ className: `qmLabelContainer ${containerClasses} ${className || ""}`, tag: "label", isBlock: true, isBold: true, isSmaller: true }, dynamicProps),
        text,
        isRequired && (React.createElement(Text, { className: "qmLabelRequired", title: "Required field", text: "*", isBold: true, isSmaller: true }))));
}
Label.displayName = "Label";
export default memo(Label);
//# sourceMappingURL=index.js.map