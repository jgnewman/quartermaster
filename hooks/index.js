import { useEffect, useMemo, useRef, } from "react";
import { createId, } from "../lib/helpers";
export function useId() {
    return useMemo(function () {
        return createId();
    }, []);
}
export function useMergedRefs(refA, refB) {
    return useMemo(function () {
        return function (value) {
            [refA, refB].forEach(ref => {
                if (ref) {
                    ref.current = value;
                }
            });
        };
    }, [refA, refB]);
}
export function usePrevious(value) {
    const ref = useRef();
    useEffect(() => { ref.current = value; });
    return ref.current;
}
export function useSyncRef(value) {
    const ref = useRef();
    ref.current = value;
    return ref;
}
//# sourceMappingURL=index.js.map