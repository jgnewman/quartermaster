import "./styles.styl"
import React, { PureComponent } from "react"

import { buildClassNames } from "../lib/helpers"

const DEFAULT_DURATION = 2000

export interface AnimationProps {
  className?: string
  direction?: "left" | "right" | "up" | "down"
  duration?: number
  override?: "hide" | "show" | null
  style?: any
  type: "fadeIn" | "fadeOut"
}

interface AnimationState {
  isAnimating: boolean
}

class Animation extends PureComponent<AnimationProps, AnimationState> {
  static displayName = "Animation"
  public state: AnimationState

  constructor(props: AnimationProps) {
    super(props)
    this.state = {
      isAnimating: props.override ? false : true,
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

    const { isAnimating } = this.state
    const hasOverride = typeof override === "string"

    const animClasses = buildClassNames({
      isAnimating,
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
      <div className={`qmAnimationContainer ${animClasses} ${className || ""}`} style={extendedStyle}>
        {children}
      </div>
    )
  }
}

export default Animation
