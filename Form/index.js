import React, { memo, useCallback, useState, } from "react";
function useFormState(initialState) {
    const [state, setState] = useState(Object.assign({}, initialState));
    const formState = Object.assign({}, state);
    function setFormStateCallback(vals) {
        setState(Object.assign(Object.assign({}, state), vals));
    }
    function updateValueForCallback(name) {
        return (evt) => {
            const val = (typeof evt === "string" || evt === null)
                ? evt
                : evt.target.value;
            setState(Object.assign(Object.assign({}, state), { [name]: val }));
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