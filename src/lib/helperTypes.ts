import { ChangeEvent } from "react"
export type RefFunction = (elem: HTMLElement | null) => void
export type InputElem = HTMLInputElement | HTMLTextAreaElement
export type NullableInputElem = InputElem | null

export interface FauxChangeEvent {
  target: {
    value: string | number | null
  }
}

export type FauxChangeEventHandler<T = Element> = (event: ChangeEvent<T> | FauxChangeEvent) => void

export interface DynamicProps {
  [key: string]: unknown
}
