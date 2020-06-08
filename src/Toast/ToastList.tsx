import React, {
  memo,
  useState,
} from "react"

import {
  ToastListProps,
  ToastMessage,
} from "./types"

import {
  useToastListener,
} from "./hooks"

import Toast from "./Toast"

function ToastList({
  eventName,
  isBottom,
}: ToastListProps) {
  const [messages, setMessages] = useState<ToastMessage[]>([])

  useToastListener(eventName, setMessages)

  return (
    <div className={`qmToastList`}>
      {messages.map(({
        alignment,
        body,
        duration,
        id,
        isDismissible,
      }) => (
        <Toast
          key={id}
          alignment={alignment}
          body={body}
          duration={duration}
          eventName={eventName}
          id={id}
          isBottom={isBottom}
          isDismissible={isDismissible}
        />
      ))}
    </div>
  )
}

ToastList.displayName = "ToastList"

export default memo(ToastList)
