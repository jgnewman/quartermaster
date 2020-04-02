import React, { PureComponent } from "react"

import { noopEvtHandler } from "../lib/helpers"
import { DynamicProps } from "../lib/helperTypes"

import {
  AnchorContainer,
  ButtonContainer,
  SpanButtonContent,
 } from "./styles"

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

  handleFocus = () => this.setState({ isFocused: true })
  handleBlur = () => this.setState({ isFocused: false })

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
    const buttonClickHandler = clickHandler || noopEvtHandler
    const shouldApplyClickHandler = !!clickHandler && !isDisabled && !isProcessing
    const dynamicProps: DynamicProps = {}

    if (shouldApplyClickHandler) {
      dynamicProps.onClick = buttonClickHandler
    }

    if (!!isDisabled || isProcessing) {
      dynamicProps.disabled = true
    }

    const classes = ["qm-button"]

    if (isDisabled) {
      classes.push("is-disabled")
    }

    if (isProcessing) {
      classes.push("is-processing")
    }

    if (highlight) {
      classes.push("is-" + highlight)
    }

    if (className) {
      classes.push(className)
    }

    dynamicProps.className = classes.join(" ")

    const content = (
      <SpanButtonContent className={`qm-button-content`}>
        {text}
        {children}
      </SpanButtonContent>
    )

    switch (tag) {

      case "a":
        return (
          <AnchorContainer
            isFocused={isFocused}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            {...dynamicProps}>
            {content}
          </AnchorContainer>
        )

      case "button":
      default:
        return (
          <ButtonContainer
            isFocused={isFocused}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            {...dynamicProps}>
            {content}
          </ButtonContainer>
        )

    }

  }
}

export default Button
