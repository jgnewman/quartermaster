import "./styles.css";
import React, { memo, } from "react";
import { buildClassNames, } from "../lib/helpers";
import Label from "../Label";
import Text from "../Text";
import { useFormattedValue, } from "./hooks";
const Ticks = memo(function ({ max, min, value }) {
    const ticks = [];
    while (min <= max) {
        ticks.push(React.createElement("span", { key: min, className: `qmSliderTick${value === min ? " isActive" : ""}` }));
        min += 1;
    }
    return (React.createElement("div", { className: "qmSliderTicks" }, ticks));
});
Ticks.displayName = "Ticks";
function Slider({ changeHandler, className, formatValue, hasTicks, id, isCompact, isDisabled, isRequired, label, max, min, tabIndex, value, }) {
    const formattedValue = useFormattedValue(formatValue, value);
    const labelProps = {
        isRequired,
    };
    const inputProps = {};
    if (id) {
        labelProps.htmlFor = id;
        inputProps.id = id;
    }
    if (isDisabled) {
        inputProps.disabled = true;
    }
    if (tabIndex) {
        inputProps.tabIndex = tabIndex;
    }
    if (changeHandler) {
        inputProps.onChange = changeHandler;
    }
    const containerClasses = buildClassNames({
        isCompact,
        hasTicks,
    });
    const labelClasses = buildClassNames({
        isCompact,
    });
    const valueClasses = labelClasses;
    const inputWrapperClasses = labelClasses;
    const inputClasses = labelClasses;
    return (React.createElement("div", { className: `qmSliderContainer ${containerClasses} ${className || ""}` },
        hasTicks && React.createElement(Ticks, { max: max, min: min, value: value }),
        React.createElement("div", { className: "qmSliderLabelWrapper" },
            React.createElement(Text, { className: `qmSliderValue ${valueClasses}`, text: formattedValue }),
            label && React.createElement(Label, Object.assign({ className: `qmSliderLabel ${labelClasses}`, text: label }, labelProps))),
        React.createElement("div", { className: `qmSliderInputWrapper ${inputWrapperClasses}` },
            React.createElement("input", Object.assign({ className: `qmSliderInput ${inputClasses}`, max: max, min: min, type: "range", value: value }, inputProps)))));
}
Slider.displayName = "Slider";
export default memo(Slider);
//# sourceMappingURL=index.js.map