export interface PublishableMessage {
  body: string
  duration?: number
  isDismissible?: boolean
}

export interface ToastMessage extends PublishableMessage {
  id: string
}

export interface ToastProps extends ToastMessage {
  eventName: string
  isBottom: boolean
  isDismissible?: boolean
}

export interface ToastListProps {
  eventName: string
  isBottom: boolean
}

export interface Listeners {
  [key: string]: Listener[]
}

export interface AreaMessages {
  [key: string]: ToastMessage[]
}

export type XPos = "left" | "center" | "right"
export type YPos = "top" | "bottom"
export type Listener = (messages: ToastMessage[]) => void
