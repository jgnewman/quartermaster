import "./styles.styl"

import {
  ReactNode,
  createElement,
  memo,
} from "react"

import { DynamicProps } from "../lib/helperTypes"
import { buildClassNames } from "../lib/helpers"

export interface TextProps {
  children?: ReactNode
  className?: string
  htmlFor?: string
  isBlock?: boolean
  isBold?: boolean
  isSmaller?: boolean
  isSmallest?: boolean
  isUppercase?: boolean
  tag?: string
  text?: string
  title?: string
}

function Text({
  children,
  className,
  htmlFor,
  isBlock,
  isBold,
  isSmaller,
  isSmallest,
  isUppercase,
  tag = "span",
  text,
  title,
}: TextProps) {

  const dynamicProps: DynamicProps = {}

  if (htmlFor) {
    dynamicProps.htmlFor = htmlFor
  }

  if (title) {
    dynamicProps.title = title
  }

  const containerClasses = buildClassNames({
    isBlock,
    isBold,
    isUppercase,
    [isSmallest ? "isSmallest" : "isSmaller"] : isSmallest || isSmaller,
  })

  return createElement(tag, {
    className: `qmTextContainer ${containerClasses} ${className || ""}`,
    ...dynamicProps,
  }, text || children)
}

Text.displayName = "Text"

export default memo(Text)
