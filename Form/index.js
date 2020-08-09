import React, { memo, useCallback, useState, } from "react";
function useFormState(initialState) {
    const [state, setState] = useState(Object.assign({}, initialState));
    const formState = Object.assign({}, state);
    function setFormStateCallback(vals) {
        setState(Object.assign(Object.assign({}, state), vals));
    }
    function updateValueForCallback(name) {
        return (evt) => {
            switch (typeof evt) {
                case "string":
                case "number":
                case "boolean":
                    setState(Object.assign(Object.assign({}, state), { [name]: evt }));
                    break;
                default:
                    if (Array.isArray(evt) || evt === null) {
                        setState(Object.assign(Object.assign({}, state), { [name]: evt }));
                    }
                    else {
                        const target = evt.target;
                        const isRange = target.type === "range";
                        const value = isRange ? parseInt(target.value, 10) : target.value;
                        setState(Object.assign(Object.assign({}, state), { [name]: value }));
                    }
            }
        };
    }
    function toggleCheckedForCallback(name) {
        return () => {
            if (typeof state[name] !== "boolean") {
                throw new Error(`
          "toggleCheckedFor" expects to update booleans but "${name}" is currently ${state[name]}.
        `);
            }
            setState(Object.assign(Object.assign({}, state), { [name]: !state[name] }));
        };
    }
    const setFormState = useCallback(setFormStateCallback, [state, setState]);
    const updateValueFor = useCallback(updateValueForCallback, [state, setState]);
    const toggleCheckedFor = useCallback(toggleCheckedForCallback, [state, setState]);
    return {
        formState,
        setFormState,
        updateValueFor,
        toggleCheckedFor,
    };
}
function Form({ children, initialState, }) {
    if (typeof children !== "function") {
        throw new Error("Quartermaster Form component must take a single function child.");
    }
    return (React.createElement("div", { className: "qmFormContainer" }, children(useFormState(initialState))));
}
Form.displayName = "Form";
export default memo(Form);
//# sourceMappingURL=index.js.map