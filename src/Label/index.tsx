import "./styles.styl"
import React, { memo } from "react"

import { DynamicProps } from "../lib/helperTypes"
import { buildClassNames } from "../lib/helpers"

export interface LabelProps {
  className?: string
  htmlFor?: string
  isRequired?: boolean
  text: string
}

function Label({
  className,
  htmlFor,
  isRequired,
  text,
}: LabelProps) {

  const dynamicProps: DynamicProps = {}

  if (htmlFor) {
    dynamicProps.htmlFor = htmlFor
  }

  const containerClasses = buildClassNames({ isRequired })

  return (
    <label
      className={`qmLabelContainer ${containerClasses} ${className || ""}`}
      {...dynamicProps}>
      {text}{isRequired && <span className="qmLabelRequired" title="Required field">*</span>}
    </label>
  )
}

Label.displayName = "Label"

export default memo(Label)
