import "./styles.styl"
import React, { memo } from "react"

import { DynamicProps } from "../lib/helperTypes"
import { buildClassNames } from "../lib/helpers"

import Text from "../Text"

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
    <Text
      className={`qmLabelContainer ${containerClasses} ${className || ""}`}
      tag="label"
      isBlock
      isBold
      isSmaller
      {...dynamicProps}
    >
      {text}{isRequired && (
        <Text
          className="qmLabelRequired"
          title="Required field"
          text="*"
          isBold
          isSmaller
        />
      )}
    </Text>
  )
}

Label.displayName = "Label"

export default memo(Label)
