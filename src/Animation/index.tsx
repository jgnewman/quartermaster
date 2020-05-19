import "./styles.styl"

import React, { RefObject,
  ReactNode,
  forwardRef,
  memo,
} from "react"

import { buildClassNames } from "../lib/helpers"

const DEFAULT_DURATION = 200

export interface AnimationProps {
  children?: ReactNode
  className?: string
  direction?: "left" | "right" | "up" | "down"
  duration?: number
  override?: "hide" | "show" | null
  style?: any
  type: "fadeIn" | "fadeOut"
}

const Animation = forwardRef(function ({
  children,
  className,
  direction,
  duration = DEFAULT_DURATION,
  override,
  style,
  type,
}: AnimationProps, ref: RefObject<HTMLDivElement>) {

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
      ref={ref}
      style={extendedStyle}>
      {children}
    </div>
  )
})

Animation.displayName = "Animation"

export default memo(Animation)
