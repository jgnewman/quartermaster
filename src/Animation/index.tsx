import "./styles.styl"
import React, { PureComponent } from "react"

import { buildClassNames } from "../lib/helpers"

const DEFAULT_DURATION = 200

export interface AnimationProps {
  className?: string
  direction?: "left" | "right" | "up" | "down"
  duration?: number
  type: "fadeIn" | "fadeOut"
}

class Animation extends PureComponent<AnimationProps> {
  static displayName = "Animation"
  public state = { isAnimating: true }

  render() {
    const {
      children,
      className,
      direction,
      duration = DEFAULT_DURATION,
      type,
    } = this.props

    const { isAnimating } = this.state

    const animClasses = buildClassNames({
      isAnimating,
      isDown: direction === "down",
      isFadeIn: type === "fadeIn",
      isFadeOut: type === "fadeOut",
      isLeft: direction === "left",
      isRight: direction === "right",
      isUp: direction === "up",
    })

    const cssDuration = duration / 1000

    const style = {
      animationDuration: cssDuration + "s",
    }

    return (
      <div className={`qmAnimationContainer ${animClasses} ${className || ""}`} style={style}>
        {children}
      </div>
    )
  }
}

export default Animation
