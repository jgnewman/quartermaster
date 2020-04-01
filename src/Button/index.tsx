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
  isDisabled?: boolean
  isProcessing?: boolean
  tag?: "a" | "button"
  text?: string
}

class Button extends PureComponent<ButtonProps> {
  public static displayName = "Button"

  render() {
    const {
      children,
      className,
      clickHandler,
      isDisabled,
      isProcessing,
      tag,
      text,
    } = this.props

    const buttonClickHandler = clickHandler || noopEvtHandler
    const shouldApplyClickHandler = !!clickHandler && !isDisabled && !isProcessing
    const dynamicProps: DynamicProps = {}

    if (shouldApplyClickHandler) {
      dynamicProps.onClick = buttonClickHandler
    }

    if (!!isDisabled || isProcessing) {
      dynamicProps.disabled = true
    }

    dynamicProps.className =
      `qm-button ${isDisabled ? "is-disabled" : ""} ${isProcessing ? "is-processing" : ""} ${className || ""}`

    const content = (
      <SpanButtonContent className={`qm-button-content`}>
        {text}
        {children}
      </SpanButtonContent>
    )

    switch (tag) {

      case "a":
        return (
          <AnchorContainer {...dynamicProps}>
            {content}
          </AnchorContainer>
        )

      case "button":
      default:
        return (
          <ButtonContainer {...dynamicProps}>
            {content}
          </ButtonContainer>
        )

    }

  }
}

export default Button
