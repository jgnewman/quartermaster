import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
} from "react"

import {
  ToastMessage,
} from "./types"

import {
  subscribe,
  unsubscribe,
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
