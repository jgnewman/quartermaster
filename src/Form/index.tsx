import React, {
  PureComponent,
  ReactNode,
  ReactNodeArray,
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

class Form extends PureComponent<FormProps, SimpleObject> {
  static displayName = "Form"
  public state: SimpleObject

  constructor(props: FormProps) {
    super(props)
    this.state = { ...props.initialState }
  }

  setFormState: SetFormState = (vals) => {
    this.setState({ ...vals })
  }

  updateValueFor: UpdateValueFor = (name) => {
    return (evt) => {
      let val;

      if (typeof evt === "string" || evt === null) {
        val = evt
      } else {
        val = (evt.target as InputElem).value
      }

      this.setState({ [name]: val })
    }
  }

  toggleCheckedFor: ToggleCheckedFor = (name) => {
    return () => {
      if (typeof this.state[name] !== "boolean") {
        throw new Error(`
          "toggleCheckedFor" expects to update booleans but "${name}" is currently ${this.state[name]}.
        `)
      }
      this.setState({ [name]: !this.state[name] })
    }
  }

  render() {
    const { children } = this.props

    if (typeof children !== "function") {
      throw new Error("Quartermaster Form component must take a single function child.")
    }

    return (
      <div className="qmFormContainer">
        {children({
          formState: { ...this.state },
          setFormState: this.setFormState,
          updateValueFor: this.updateValueFor,
          toggleCheckedFor: this.toggleCheckedFor,
        })}
      </div>
    )
  }
}

export default Form
