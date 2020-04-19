import "./styles.styl"
import React, { PureComponent } from "react"

export interface DropdownProps {
  className?: string
}

class Dropdown extends PureComponent<DropdownProps> {
  static displayName = "Dropdown"

  render() {
    const {
      className,
    } = this.props

    return (
      <div className={`qmDropdownContainer ${className || ""}`}></div>
    )
  }
}

export default Dropdown
