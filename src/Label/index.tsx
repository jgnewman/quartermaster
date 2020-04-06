import "./styles.styl"
import React, { PureComponent } from "react"

import { DynamicProps } from "../lib/helperTypes"
import { buildClassNames } from "../lib/helpers"

export interface LabelProps {
  className?: string
  htmlFor?: string
  isRequired?: boolean
  text: string
}

class Label extends PureComponent<LabelProps> {
  static displayName = "Label"

  render() {
    const {
      className,
      htmlFor,
      isRequired,
      text,
    } = this.props

    const dynamicProps: DynamicProps = {}

    if (htmlFor) {
      dynamicProps.htmlFor = htmlFor
    }

    const containerClasses = buildClassNames({ isRequired })

    return (
      <label
        className={`qmLabel ${containerClasses} ${className || ""}`}
        {...dynamicProps}>
        {text}{isRequired && <span className="qmLabelRequired" title="Required field">*</span>}
      </label>
    )
  }
}

export default Label
