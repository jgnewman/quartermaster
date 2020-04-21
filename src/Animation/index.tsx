import "./styles.styl"
import React, { PureComponent } from "react"

import { RefFunction } from "../lib/helperTypes"
import { buildClassNames } from "../lib/helpers"

const DEFAULT_DURATION = 200

export interface AnimationProps {
  className?: string
  direction?: "left" | "right" | "up" | "down"
  duration?: number
  elemRef?: RefFunction // function like (elem => this.myRef = elem)
  override?: "hide" | "show" | null
  style?: any
  type: "fadeIn" | "fadeOut"
}

class Animation extends PureComponent<AnimationProps> {
  static displayName = "Animation"

  refFn = (elem: HTMLDivElement | null) => {
    if (this.props.elemRef) {
      this.props.elemRef(elem)
    }
  }

  render() {
    const {
      children,
      className,
      direction,
      duration = DEFAULT_DURATION,
      override,
      style,
      type = {},
    } = this.props

    const hasOverride = typeof override === "string"

    const animClasses = buildClassNames({
      isAnimating: !hasOverride,
      isOverrideHide: override === "hide",
      isOverrideShow: override === "show",
      isDown: !hasOverride && direction === "down",
      isFadeIn: !hasOverride && type === "fadeIn",
      isFadeOut: !hasOverride && type === "fadeOut",
      isLeft: !hasOverride && direction === "left",
      isRight: !hasOverride && direction === "right",
      isUp: !hasOverride && direction === "up",
    })

    const cssDuration = duration / 1000

    const extendedStyle = {
      ...style,
      animationDuration: cssDuration + "s",
    }

    return (
      <div
        className={`qmAnimationContainer ${animClasses} ${className || ""}`}
        ref={this.refFn}
        style={extendedStyle}>
        {children}
      </div>
    )
  }
}

export default Animation
