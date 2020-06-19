import React, { forwardRef, memo, } from "react";
import { buildClassNames, } from "../lib/helpers";
import Calendar from "../icons/Calendar";
import Checkmark from "../icons/Checkmark";
import Ex from "../icons/Ex";
import { useClearValue, useConfirmValue, } from "./hooks";
const DatePickerControls = forwardRef(function ({ changeHandler, enableRange, isCompact, isDisabled, isOpen, setOpen, }, ref) {
    const handleClickEx = useClearValue(changeHandler, enableRange);
    const handleClickCheck = useConfirmValue(setOpen);
    const calWrapperClasses = buildClassNames({
        isDisabled,
    });
    const controlClasses = buildClassNames({
        isCompact,
    });
    const exClasses = `isEx ${controlClasses}`;
    const checkClasses = `isCheck ${controlClasses}`;
    return (React.createElement("div", { className: "qmDatePickerControls" },
        !isOpen && (React.createElement("div", { className: `qmDatePickerCalIconWrapper ${calWrapperClasses}` },
            React.createElement(Calendar, { className: "qmDatePickerCalIcon", size: "s" }))),
        isOpen && (React.createElement(React.Fragment, null,
            React.createElement("button", { className: `qmDatePickerControl ${exClasses}`, onClick: handleClickEx },
                React.createElement(Ex, { className: "qmDatePickerControlIcon isEx", size: "s", title: "Clear value" })),
            React.createElement("button", { className: `qmDatePickerControl ${checkClasses}`, onClick: handleClickCheck, ref: ref },
                React.createElement(Checkmark, { className: "qmDatePickerControlIcon isCheck", size: "s", title: "Done" }))))));
});
DatePickerControls.displayName = "DatePickerControls";
export default memo(DatePickerControls);
//# sourceMappingURL=DatePickerControls.js.map