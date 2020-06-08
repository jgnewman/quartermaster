import React, {
  memo,
  useState,
} from "react"

import {
  buildClassNames,
} from "../lib/helpers"

import Animation from "../Animation"
import Ex from "../icons/Ex"
import IconButton from "../IconButton"
import Text from "../Text"

import {
  ToastProps,
} from "./types"

import {
  useMessageRemover,
} from "./hooks"

const DEFAULT_DURATION = 3000

function Toast({
  alignment,
  id,
  body,
  duration = DEFAULT_DURATION,
  eventName,
  isBottom,
  isDismissible,
}: ToastProps) {

  const [shouldShow, setShouldShow] = useState(true)

  const animType = shouldShow ? "fadeIn" : "fadeOut"
  const slideIn = isBottom ? "up" : "down"
  const slideOut = isBottom ? "down" : "up"
  const animDirection = shouldShow ? slideIn : slideOut

  const removeMessage = useMessageRemover(
    eventName,
    id,
    duration,
    setShouldShow,
  )

  const alignClasses = buildClassNames({
    isLX: alignment === "left",
    isCX: alignment === "center",
    isRX: alignment === "right",
  })

  return (
    <Animation
      className={`qmToast ${alignClasses}`}
      type={animType}
      direction={animDirection}
      removeOnHide={true}
    >
      <div className="qmToastContentWrapper">
        <div className="qmToastContent">
          <Text className="qmToastText">
            {body}
          </Text>

          {isDismissible && (
            <IconButton
              className="qmToastClearButton"
              clickHandler={removeMessage}>
              <Ex size="s" />
            </IconButton>
          )}
        </div>
      </div>
    </Animation>
  )
}

Toast.displayName = "Toast"

export default memo(Toast)
