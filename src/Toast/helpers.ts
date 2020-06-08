import {
  AreaMessages,
  Listener,
  Listeners,
  ToastMessage,
} from "./types"

export const listeners: Listeners = {}
export const areaMessages: AreaMessages = {}

export function addMessageToAreaMessages(eventName: string, msg: ToastMessage) {
  areaMessages[eventName] = [...areaMessages[eventName], msg]
}

export function removeMessageFromAreaMessages(eventName: string, id: string) {
  areaMessages[eventName] = areaMessages[eventName].filter(msg => msg.id !== id)
}

export function publish(eventName: string, msg: ToastMessage) {
  if (listeners[eventName]) {
    addMessageToAreaMessages(eventName, msg)
    listeners[eventName].forEach(listener => listener(areaMessages[eventName]))
  }
}

export function subscribe(eventName: string, listener: Listener) {
  listeners[eventName] = listeners[eventName] || []
  listeners[eventName].push(listener)
}

export function unsubscribe(eventName: string, listener: Listener) {
  if (listeners[eventName]) {
    listeners[eventName].splice(listeners[eventName].indexOf(listener), 1)
  }
}
