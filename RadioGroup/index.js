import React, { forwardRef, memo, } from "react";
import RadioButton from "../RadioButton";
const RadioOption = memo(forwardRef(function ({ changeHandler, groupValue, id, isDisabled, label, name, tabIndex, value, }, ref) {
    const dynamicProps = {};
    if (id) {
        dynamicProps.id = id;
    }
    if (tabIndex) {
        dynamicProps.tabIndex = tabIndex;
    }
    if (changeHandler) {
        dynamicProps.changeHandler = changeHandler;
    }
    return React.createElement(RadioButton, Object.assign({ ref: ref, groupName: name, isChecked: groupValue === value, isDisabled: !!isDisabled, label: label, value: value }, dynamicProps));
}));
RadioOption.displayName = "RadioOption";
function RadioGroup({ className, changeHandler, isDisabled, name, options, value, }) {
    return (React.createElement("div", { className: `qmRadioGroupContainer ${className || ""}` }, options.map(option => (React.createElement(RadioOption, Object.assign({ key: option.value, changeHandler: changeHandler, isDisabled: isDisabled, name: name, groupValue: value }, option))))));
}
RadioGroup.displayName = "RadioGroup";
export default memo(RadioGroup);
//# sourceMappingURL=index.js.map