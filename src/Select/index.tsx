import React, { PureComponent } from "react"

export interface SelectProps {
  className?: string
}

class Select extends PureComponent<SelectProps> {
  public displayName = "Select"

  render() {
    const {
      className,
    } = this.props

    return (
      <div className={`qm-select ${className || ""}`}></div>
    )
  }
}

export default Select

/*
<Select
  options={[ { label: "Foo", value: "foo" }, { label: "Bar", value: "bar" } ]}
  className="foo"
  label="My Label"
  id="id"
  isDisabled={false}
  closeOnSelect={true}
  isMulti={false}
  value="foo" // also takes an array of values for if isMulti
  filterable={true} // allows typing in the field to filter out non-matching options
/>

- close when click away
*/