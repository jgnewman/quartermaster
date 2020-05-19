import "./styles.styl"

import React, {
  ReactNode,
  memo,
  useCallback,
  useRef,
  useState,
} from "react"

import { DynamicProps } from "../lib/helperTypes"
import { buildClassNames } from "../lib/helpers"

import Spinner from "../Spinner"

export interface ButtonProps {
  children?: ReactNode
  className?: string
  clickHandler?: React.MouseEventHandler
  highlight?: "positive" | "negative"
  href?: string
  isCompact?: boolean
  isDisabled?: boolean
  isProcessing?: boolean
  tag?: "a" | "button"
  text?: string
}

function Button({
  children,
  className,
  clickHandler,
  highlight,
  href,
  isCompact,
  isDisabled,
  isProcessing,
  tag,
  text,
}: ButtonProps) {

  const [isFocused, setIsFocused] = useState(false)
  const handleFocus = useCallback(() => setIsFocused(true), [setIsFocused])
  const handleBlur = useCallback(() => setIsFocused(false), [setIsFocused])

  const buttonRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null)

  const handleClick = useCallback((evt: React.MouseEvent) => {
    const { current: currentRef } = buttonRef
    currentRef && currentRef.blur()
    clickHandler && clickHandler(evt)
  }, [buttonRef, clickHandler])

  const isEnabled = !isDisabled && !isProcessing
  const isNegative = highlight === "negative"
  const isPositive = highlight === "positive"
  const shouldApplyClickHandler = !!clickHandler && !isDisabled && !isProcessing

  const dynamicProps: DynamicProps = {
    ref: buttonRef,
  }

  if (shouldApplyClickHandler) {
    dynamicProps.onClick = handleClick
  }

  if (!!isDisabled || isProcessing) {
    dynamicProps.disabled = true
  }

  if (tag === "a" && href) {
    dynamicProps.href = href
  }

  const containerClasses = buildClassNames({
    isCompact,
    isDisabled,
    isEnabled,
    isProcessing,
    isFocused,
    isNegative,
    isPositive,
  })

  dynamicProps.className = `qmButtonContainer ${containerClasses} ${className || ""}`

  const content = (
    <span className="qmButtonContent">
      {text}
      {children}
    </span>
  )

  const spinner = !isProcessing ? null : (
    <Spinner
      className="qmButtonSpinner"
      size={isCompact ? "m" : "i"}
    />
  )

  switch (tag) {

    case "a":
      return (
        <a
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...dynamicProps}>
          {spinner}
          {content}
        </a>
      )

    case "button":
    default:
      return (
        <button
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...dynamicProps}>
          {spinner}
          {content}
        </button>
      )

  }
}

Button.displayName = "Button"

export default memo(Button)
