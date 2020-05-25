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
    isSmaller,
    isUppercase,
  })

  return createElement(tag, {
    className: `qmTextContainer ${containerClasses} ${className || ""}`,
    ...dynamicProps,
  }, text || children)
}

Text.displayName = "Text"

export default memo(Text)
