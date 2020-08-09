import { useMemo, } from "react";
export function useFormattedValue(formatValue, value) {
    return useMemo(function () {
        return formatValue ? formatValue(value) : String(value);
    }, [formatValue, value]);
}
//# sourceMappingURL=hooks.js.map