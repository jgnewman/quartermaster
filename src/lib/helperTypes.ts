export type RefFunction = (elem: HTMLElement | null) => void
export type InputElem = HTMLInputElement | HTMLTextAreaElement
export type NullableInputElem = InputElem | null

export interface DynamicProps {
  [key: string]: unknown
}
