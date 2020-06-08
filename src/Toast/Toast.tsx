import React, {
  memo,
  useState,
} from "react"

import Animation from "../Animation"
import Ex from "../icons/Ex"
import IconButton from "../IconButton"
import Text from "../Text"

import {
  ToastProps,
} from "./types"

import {
  removeMessageFromAreaMessages,
} from "./helpers"

const DEFAULT_DURATION = 3000

function Toast({
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

  setTimeout(() => {
    setShouldShow(false)
    removeMessageFromAreaMessages(eventName, id)
  }, duration)

  return (
    <Animation
      className="qmToast"
      type={animType}
      direction={animDirection}
      removeOnHide={true}>
      <Text>{body}</Text>

      {isDismissible && (
        <IconButton>
          <Ex size="s" />
        </IconButton>
      )}
    </Animation>
  )
}

Toast.displayName = "Toast"

export default memo(Toast)
