export function noopEvtHandler() { return }

interface DynamicProps {
  [key: string]: unknown
}

type InputElem = HTMLInputElement | HTMLTextAreaElement
type StringFn = (s: string) => void

export function manuallySetFieldValue(ref: InputElem, value: string, isTextArea: boolean, events: string[] = []) {
  const proto = window[isTextArea ? "HTMLTextAreaElement" : "HTMLInputElement"].prototype
  const inputSetter = (Object.getOwnPropertyDescriptor(proto, "value") as DynamicProps).set as StringFn

  inputSetter.call(ref, value)
  events.forEach(evtName => ref.dispatchEvent(new Event(evtName, { bubbles: true })))
}
