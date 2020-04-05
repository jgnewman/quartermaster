import "./styles.styl"
import React, { PureComponent } from "react"

import { DynamicProps } from "../lib/helperTypes"

export interface ButtonProps {
  className?: string
  clickHandler?: React.MouseEventHandler
  highlight?: "positive" | "negative"
  isDisabled?: boolean
  isProcessing?: boolean
  tag?: "a" | "button"
  text?: string
}

class Button extends PureComponent<ButtonProps> {
  static displayName = "Button"
  public state = { isFocused: false }
  public buttonRef: HTMLElement | null

  handleFocus = () => this.setState({ isFocused: true })
  handleBlur = () => this.setState({ isFocused: false })

  handleClick = (evt: React.MouseEvent) => {
    const { clickHandler } = this.props
    this.buttonRef && this.buttonRef.blur()
    clickHandler && clickHandler(evt)
  }

  render() {
    const {
      children,
      className,
      clickHandler,
      highlight,
      isDisabled,
      isProcessing,
      tag,
      text,
    } = this.props

    const { isFocused } = this.state
    const shouldApplyClickHandler = !!clickHandler && !isDisabled && !isProcessing

    const dynamicProps: DynamicProps = {
      ref: (elem: HTMLElement) => this.buttonRef = elem,
    }

    if (shouldApplyClickHandler) {
      dynamicProps.onClick = this.handleClick
    }

    if (!!isDisabled || isProcessing) {
      dynamicProps.disabled = true
    }

    const classes = ["qmButtonContainer"]

    if (!isDisabled && !isProcessing) {
      classes.push("isEnabled")

    } else {
      isDisabled && classes.push("isDisabled")
      isProcessing && classes.push("isProcessing")
    }

    isFocused && classes.push("isFocused")
    highlight && classes.push("is" + highlight[0].toUpperCase() + highlight.slice(1))
    className && classes.push(className)

    dynamicProps.className = classes.join(" ")

    const content = (
      <span className="qmButtonContent">
        {text}
        {children}
      </span>
    )

    switch (tag) {

      case "a":
        return (
          <a
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            {...dynamicProps}>
            {content}
          </a>
        )

      case "button":
      default:
        return (
          <button
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            {...dynamicProps}>
            {content}
          </button>
        )

    }

  }
}

export default Button
