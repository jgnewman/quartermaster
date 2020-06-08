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
        id,
        body,
        duration,
        isDismissible,
      }) => (
        <Toast
          key={id}
          id={id}
          body={body}
          duration={duration}
          eventName={eventName}
          isBottom={isBottom}
          isDismissible={isDismissible}
        />
      ))}
    </div>
  )
}

ToastList.displayName = "ToastList"

export default memo(ToastList)
