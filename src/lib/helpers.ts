import {
  DynamicProps,
  InputElem,
} from "./helperTypes"

export function noopEvtHandler() { return }

type VoidStringFn = (s: string) => void
type ElemTypeString = "HTMLInputElement" | "HTMLTextAreaElement"

function getInputSetter(elemType: ElemTypeString, propName: string) {
  const proto = window[elemType].prototype
  return (Object.getOwnPropertyDescriptor(proto, propName) as DynamicProps).set as VoidStringFn
}

export function manuallySetFieldValue(
  ref: InputElem,
  value: string,
  isTextArea: boolean,
  events: string[] = [],
) {
  const inputSetter = getInputSetter(isTextArea ? "HTMLTextAreaElement" : "HTMLInputElement", "value")
  inputSetter.call(ref, value)
  events.forEach(evtName => ref.dispatchEvent(new Event(evtName, { bubbles: true, cancelable: true })))
}

declare global {
  interface Window {
    [key: string]: unknown
  }
}

export function manuallyTickCheckbox(ref: HTMLInputElement) {
  ref.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }))
}

export function manuallyTickRadioButton(ref: HTMLInputElement) {
  ref.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }))
}
