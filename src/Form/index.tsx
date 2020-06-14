import React, {
  ChangeEvent,
  ReactNode,
  ReactNodeArray,
  memo,
  useCallback,
  useState,
} from "react"

import type {
  InputElem,
} from "../lib/helperTypes"

import type {
  ValidValueRange,
} from "../DatePicker/types"

type SimpleValue = string | number | boolean | null

interface SimpleObject {
  [key: string]: SimpleValue | ValidValueRange
}

type SetFormState = (vals: SimpleObject) => void
type UpdateValueFor = (name: string) => (evt: ChangeEvent | SimpleValue | ValidValueRange) => void
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
    return (evt: ChangeEvent | SimpleValue | ValidValueRange) => {
      switch (typeof evt) {

        case "string":
        case "number":
        case "boolean":
          setState({ ...state, [name]: evt })
          break

        default:
          if (Array.isArray(evt) || evt === null) {
            setState({ ...state, [name]: evt })
          } else {
            setState({ ...state, [name]: (evt.target as InputElem).value })
          }

      }
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
