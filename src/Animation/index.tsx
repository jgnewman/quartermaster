import "./styles.styl"

import React, {
  Ref,
  ReactNode,
  forwardRef,
  memo,
} from "react"

import { buildClassNames } from "../lib/helpers"
import { useDetachedElements } from "./hooks"

const DEFAULT_DURATION = 200

export interface AnimationProps {
  children?: ReactNode
  className?: string
  direction?: "left" | "right" | "up" | "down"
  displayNoneOnHide?: boolean
  duration?: number
  override?: "hide" | "show" | null
  removeOnHide?: boolean
  style?: any
  type: "fadeIn" | "fadeOut"
}

const Animation = forwardRef(function ({
  children,
  className,
  displayNoneOnHide = false,
  direction,
  duration = DEFAULT_DURATION,
  override,
  removeOnHide = false,
  style,
  type,
}: AnimationProps, ref: Ref<HTMLDivElement>) {

  const hasOverride = typeof override === "string"
  const isOverrideHide = override === "hide"
  const hasDirection = !!direction

  const [isDetached, isRemoved] = useDetachedElements(
    displayNoneOnHide,
    duration,
    isOverrideHide,
    removeOnHide,
    type,
  )

  if (isRemoved) {
    return null
  }

  const animClasses = buildClassNames({
    isAnimating: !hasOverride,
    isDetached,
    isOverrideHide,
    isOverrideShow: override === "show",
    isFadeIn: !hasOverride && type === "fadeIn",
    isFadeOut: !hasOverride && type === "fadeOut",
    isStill: !hasDirection,
    isDown: !hasOverride && direction === "down",
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
