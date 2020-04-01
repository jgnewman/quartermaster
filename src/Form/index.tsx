import React, {
  PureComponent,
  ReactNode,
  ReactNodeArray,
} from "react"

import { InputElem } from "src/lib/helperTypes"

interface SimpleObject {
  [key: string]: string | number | boolean | null
}

type GetFormState = () => any
type SetFormState = (vals: SimpleObject) => void
type UpdateValueFor = (name: string) => (evt: React.ChangeEvent | string | null) => void
type ToggleCheckedFor = (name: string) => () => void

interface FormUtils {
  getFormState: GetFormState
  setFormState: SetFormState
  updateValueFor: UpdateValueFor
  toggleCheckedFor: ToggleCheckedFor
}

export interface FormProps {
  children: (utils: FormUtils) => ReactNode | ReactNodeArray
  initialState: SimpleObject
}

class Form extends PureComponent<FormProps, SimpleObject> {
  public displayName = "Form"
  public state: SimpleObject

  public getFormState: GetFormState = () => {
    return { ...this.state }
  }

  public setFormState: SetFormState = (vals) => {
    this.setState({ ...vals })
  }

  public updateValueFor: UpdateValueFor = (name) => {
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

  public toggleCheckedFor: ToggleCheckedFor = (name) => {
    return () => {
      if (typeof this.state[name] !== "boolean") {
        throw new Error(`
          "toggleCheckedFor" expects to update booleans but "${name}" is currently ${this.state[name]}.
        `)
      }
      this.setState({ [name]: !this.state[name] })
    }
  }

  constructor(props: FormProps) {
    super(props)
    this.state = { ...props.initialState }
  }

  render() {
    const { children } = this.props

    if (typeof children !== "function") {
      throw new Error("Quartermaster Form component must take a single function child.")
    }

    return (
      <div className="qm-form">
        {children({
          getFormState: this.getFormState,
          setFormState: this.setFormState,
          updateValueFor: this.updateValueFor,
          toggleCheckedFor: this.toggleCheckedFor,
        })}
      </div>
    )
  }
}

export default Form