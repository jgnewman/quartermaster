import React, {
  ChangeEvent,
  ReactNode,
  ReactNodeArray,
  memo,
  useCallback,
  useState,
} from "react"

import { InputElem } from "../lib/helperTypes"

interface SimpleObject {
  [key: string]: string | number | boolean | null
}

type SetFormState = (vals: SimpleObject) => void
type UpdateValueFor = (name: string) => (evt: ChangeEvent | string | null) => void
type ToggleCheckedFor = (name: string) => () => void

interface FormUtils {
  formState: any
  setFormState: SetFormState
  updateValueFor: UpdateValueFor
  toggleCheckedFor: ToggleCheckedFor
}

export interface FormProps {
  children: (utils: FormUtils) => ReactNode | ReactNodeArray
  initialState: SimpleObject
}

function useFormState(initialState: SimpleObject): FormUtils {
  const [state, setState] = useState({ ...initialState })
  const formState = { ...state }

  function setFormStateCallback(vals: SimpleObject) {
    setState({ ...state, ...vals })
  }

  function updateValueForCallback(name: string) {
    return (evt: ChangeEvent | string | null) => {
      const val = (typeof evt === "string" || evt === null)
        ? evt
        : (evt.target as InputElem).value
      setState({ ...state, [name]: val })
    }
  }

  function toggleCheckedForCallback(name: string) {
    return () => {
      if (typeof state[name] !== "boolean") {
        throw new Error(`
          "toggleCheckedFor" expects to update booleans but "${name}" is currently ${state[name]}.
        `)
      }
      setState({ ...state, [name]: !state[name] })
    }
  }

  const setFormState: SetFormState = useCallback(setFormStateCallback, [state, setState])
  const updateValueFor: UpdateValueFor = useCallback(updateValueForCallback, [state, setState])
  const toggleCheckedFor: ToggleCheckedFor = useCallback(toggleCheckedForCallback, [state, setState])

  return {
    formState,
    setFormState,
    updateValueFor,
    toggleCheckedFor,
  }
}

function Form({
  children,
  initialState,
}: FormProps) {

  if (typeof children !== "function") {
    throw new Error("Quartermaster Form component must take a single function child.")
  }

  return (
    <div className="qmFormContainer">
      {children(useFormState(initialState))}
    </div>
  )
}

Form.displayName = "Form"

export default memo(Form)
