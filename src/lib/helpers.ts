import { useEffect, useRef } from "react"

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

export function buildClassNames(options: DynamicProps): string {
  const classes: string[] = []
  Object.keys(options).forEach(key => options[key] && classes.push(key))
  return classes.join(" ")
}

const body: HTMLElement = window.document.body
let scrollingEnabled = true
let originalBodyHeight: string = body.style.height
let originalBodyOverflow: string = body.style.overflow

export function disableScrolling() {
  if (scrollingEnabled) {
    originalBodyHeight = body.style.height
    originalBodyOverflow = body.style.overflow

    body.style.height = "100%"
    body.style.overflow = "hidden"
    scrollingEnabled = false
  }
}

export function enableScrolling() {
  if (!scrollingEnabled) {
    body.style.height = originalBodyHeight
    body.style.overflow = originalBodyOverflow
    scrollingEnabled = true
  }
}

export function usePrevious(value: any) {
  const ref = useRef()
  useEffect(() => { ref.current = value })
  return ref.current
}
