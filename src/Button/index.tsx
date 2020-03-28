import React, {
  PureComponent,
  ReactNode,
  ReactNodeArray,
} from "react"

import { noopEvtHandler } from "../lib/helpers"

import { StyledAnchor, StyledButton } from "./styles"

export interface ButtonProps {
  children?: ReactNode | ReactNodeArray
  className?: string
  clickHandler?: React.MouseEventHandler
  isDisabled?: boolean
  isProcessing?: boolean
  tag?: "a" | "button"
  text?: string
}

interface DynamicProps {
  [key: string]: unknown
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
      <span className={`qm-button-content`}>
        {text}
        {children}
      </span>
    )

    switch (tag) {
      case "a":
        return (
          <StyledAnchor {...dynamicProps}>
            {content}
          </StyledAnchor>
        )

      case "button":
      default:
        return (
          <StyledButton {...dynamicProps}>
            {content}
          </StyledButton>
        )
    }
  }
}

export default Button
