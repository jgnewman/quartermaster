import React, { memo, } from "react";
import { buildClassNames, } from "../lib/helpers";
import Slider from "../Slider";
import { useEndTimeSetter, useSliderIds, useSliderLabels, useSliderValues, useStartTimeSetter, useTimeMappings, useValueFormatter, } from "./hooks";
function DatePickerTimes({ changeHandler, disablePast, enableRange, endDate, isCompact, now, startDate, timeIncrement, }) {
    const [startId, endId] = useSliderIds(enableRange);
    const [startLabel, endLabel] = useSliderLabels(enableRange, endDate, startDate);
    const [startTimesMap, endTimesMap] = useTimeMappings(disablePast, enableRange, endDate, now, startDate, timeIncrement);
    const [startValue, startMin, startMax] = useSliderValues(startDate, startTimesMap);
    const [endValue, endMin, endMax] = useSliderValues(endDate, endTimesMap);
    const setStartTime = useStartTimeSetter(changeHandler, enableRange, endDate, startDate, startTimesMap);
    const setEndTime = useEndTimeSetter(changeHandler, endDate, endTimesMap, startDate);
    const startTimeFormatter = useValueFormatter(startTimesMap);
    const endTimeFormatter = useValueFormatter(endTimesMap);
    const wrapperClasses = buildClassNames({
        changeHandler,
        enableRange,
        endDate,
        isCompact,
        startDate,
    });
    return (React.createElement("div", { className: `qmDatePickerTimes ${wrapperClasses}` },
        React.createElement(Slider, { changeHandler: setStartTime, className: "qmDatePickerSlider isStartDate", formatValue: startTimeFormatter, hasTicks: startMax < 50, id: startId, isCompact: isCompact, isDisabled: !startDate, label: startLabel, max: startMax, min: startMin, value: startValue }),
        enableRange && (React.createElement(Slider, { changeHandler: setEndTime, className: "qmDatePickerSlider isEndDate", formatValue: endTimeFormatter, hasTicks: endMax < 50, id: endId, isCompact: isCompact, isDisabled: !endDate, label: endLabel, max: endMax, min: endMin, value: endValue }))));
}
DatePickerTimes.displayName = "DatePickerTimes";
export default memo(DatePickerTimes);
//# sourceMappingURL=DatePickerTimes.js.map