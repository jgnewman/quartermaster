import React, {
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
type UpdateValueFor = (name: string) => (evt: React.ChangeEvent | string | null) => void
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

function Form({
  children,
  initialState,
}: FormProps) {

  const [state, setState] = useState({ ...initialState })

  const setFormState: SetFormState = useCallback((vals) => {
    setState({ ...state, ...vals })
  }, [setState])

  const updateValueFor: UpdateValueFor = useCallback((name) => {
    return (evt) => {
      let val;

      if (typeof evt === "string" || evt === null) {
        val = evt
      } else {
        val = (evt.target as InputElem).value
      }

      setState({ ...state, [name]: val })
    }
  }, [setState])

  const toggleCheckedFor: ToggleCheckedFor = useCallback((name) => {
    return () => {
      if (typeof state[name] !== "boolean") {
        throw new Error(`
          "toggleCheckedFor" expects to update booleans but "${name}" is currently ${state[name]}.
        `)
      }
      setState({ ...state, [name]: !state[name] })
    }
  }, [state, setState])

  if (typeof children !== "function") {
    throw new Error("Quartermaster Form component must take a single function child.")
  }

  return (
    <div className="qmFormContainer">
      {children({
        formState: { ...state },
        setFormState: setFormState,
        updateValueFor: updateValueFor,
        toggleCheckedFor: toggleCheckedFor,
      })}
    </div>
  )
}

Form.displayName = "Form"

export default memo(Form)
