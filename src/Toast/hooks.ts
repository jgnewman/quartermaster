import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react"

import {
  ToastMessage,
} from "./types"

import {
  subscribe,
  unsubscribe,
  removeMessageFromAreaMessages,
} from "./helpers"

export function useToastListener(
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

export function useMessageRemover(
  eventName: string,
  id: string,
  duration: number,
  setShouldShow: Dispatch<SetStateAction<boolean>>,
) {
  const [timer, setTimer] = useState(-1)

  const killMessage = useCallback(function () {
    clearTimeout(timer)
    setShouldShow(false)
    removeMessageFromAreaMessages(eventName, id)
  }, [setShouldShow, eventName, id, timer])

  useEffect(function () {
    if (timer === -1 && duration !== Infinity) {
      const newTimer = setTimeout(killMessage, duration)
      setTimer(newTimer)
    }
  }, [timer, setTimer, duration, killMessage])

  return killMessage
}
