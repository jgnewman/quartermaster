import "./styles.styl"

import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react"

import {
  render,
} from "react-dom"

import {
  buildClassNames,
} from "../lib/helpers"

import Animation from "../Animation"
import Text from "../Text"

interface ToastMessage {
  id: string
  body: string
}

interface ToastProps extends ToastMessage {
  eventName: string
  isBottom: boolean
}

interface ToastListProps {
  eventName: string
  isBottom: boolean
}

interface Listeners {
  [key: string]: Listener[]
}

interface AreaMessages {
  [key: string]: ToastMessage[]
}

type XPos = "left" | "center" | "right"
type YPos = "top" | "bottom"
type Listener = (messages: ToastMessage[]) => void

const listeners: Listeners = {}
const areaMessages: AreaMessages = {}

function addMessageToAreaMessages(eventName: string, msg: ToastMessage) {
  areaMessages[eventName] = [...areaMessages[eventName], msg]
}

function removeMessageFromAreaMessages(eventName: string, id: string) {
  areaMessages[eventName] = areaMessages[eventName].filter(msg => msg.id !== id)
}

function publish(eventName: string, msg: ToastMessage) {
  if (listeners[eventName]) {
    addMessageToAreaMessages(eventName, msg)
    listeners[eventName].forEach(listener => listener(areaMessages[eventName]))
  }
}

function subscribe(eventName: string, listener: Listener) {
  listeners[eventName] = listeners[eventName] || []
  listeners[eventName].push(listener)
}

function unsubscribe(eventName: string, listener: Listener) {
  if (listeners[eventName]) {
    listeners[eventName].splice(listeners[eventName].indexOf(listener), 1)
  }
}

function useToastListener(
  eventName: string,
  setMessages: Dispatch<SetStateAction<ToastMessage[]>>,
) {
  const listener = useCallback(function (msgs: ToastMessage[]) {
    setMessages(msgs)
  }, [setMessages])

  useEffect(function () {
    subscribe(eventName, listener)
    return function () {
      unsubscribe(eventName, listener)
    }
  }, [listener, eventName])
}

function Toast({
  id,
  body,
  eventName,
  isBottom,
}: ToastProps) {
  const [shouldShow, setShouldShow] = useState(true)
  const animType = shouldShow ? "fadeIn" : "fadeOut"
  const slideIn = isBottom ? "up" : "down"
  const slideOut = isBottom ? "down" : "up"
  const animDirection = shouldShow ? slideIn : slideOut

  setTimeout(() => {
    setShouldShow(false)
    removeMessageFromAreaMessages(eventName, id)
  }, 3000)

  return (
    <Animation
      className="qmToast"
      type={animType}
      direction={animDirection}
      removeOnHide={true}>
      <Text>{body}</Text>
    </Animation>
  )
}

Toast.displayName = "Toast"

function ToastList({
  eventName,
  isBottom,
}: ToastListProps) {
  const [messages, setMessages] = useState<ToastMessage[]>([])

  useToastListener(eventName, setMessages)

  return (
    <div className={`qmToastList`}>
      {messages.map(({ id, body }) => (
        <Toast
          key={id}
          id={id}
          body={body}
          eventName={eventName}
          isBottom={isBottom}
        />
      ))}
    </div>
  )
}

ToastList.displayName = "ToastList"

function assertToastAreaMounted(x: XPos, y: YPos) {
  const toastStyle = x + y

  if (areaMessages[toastStyle]) {
    return
  }

  areaMessages[toastStyle] = []

  const areaClasses = buildClassNames({
    isLeft: x === "left",
    isCenter: x === "center",
    isRight: x === "right",
    isTop: y === "top",
    isBottom: y === "bottom",
  })

  const div = document.createElement("div")
  div.setAttribute("class", `qmToastAreaContainer ${areaClasses}`)
  document.body.appendChild(div)

  render(
    <ToastList
      eventName={toastStyle}
      isBottom={y === "bottom"}
    />,
    div,
  )
}

export default function getToastArea(x: XPos = "right", y: YPos = "top") {
  assertToastAreaMounted(x, y)

  const eventName = x + y
  return function (msg: ToastMessage) {
    publish(eventName, msg)
  }
}

/*

TODO: WRAP IN ALERT COMPONENT
TODO: DOCUMENT IN README
TODO: MAKE DISMISSABLE
TODO: DURATION CUSTOMIZATION

function Foo(props) {
  const showToast = getToastArea("right", "top")

  if (props.error) {
    showToast({
      id: "error",
      body: "Something went wrong!"
    })
  }

  return (
    <div></div>
  )
}

*/
