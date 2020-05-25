import "./styles.styl"
import React, { memo } from "react"

import { buildClassNames } from "../lib/helpers"

import Text from "../Text"

export interface TagProps {
  className?: string
  color?: "gray" | "red" | "orange" | "yellow" | "green" | "blue" | "purple"
  text: string
}

function Tag({
  className,
  color = "gray",
  text,
}: TagProps) {

  const containerClasses = buildClassNames({
    [`is${color[0].toUpperCase()}${color.slice(1)}`]: true,
  })

  return (
    <Text
      className={`qmTagContainer ${containerClasses} ${className || ""}`}
      text={text}
      isBold
      isUppercase
    />
  )
}

Tag.displayName = "Tag"

export default memo(Tag)
