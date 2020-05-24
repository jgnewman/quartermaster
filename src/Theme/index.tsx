/**
 * Theme
 *
 * Takes data describing how to build a stylesheet.
 * Builds and injects the stylesheet on mount.
 * Removes the stylesheet on unmount.
 *
 * <Theme
 *   data={{
 *     "background": {
 *       "#000000": `
 *         .foo,
 *         .bar.baz,
 *         #quux[disabled]
 *       `
 *     },
 *     "border-radius": {
 *       "50%": `.foo, .bar.baz, #quux[disabled]`
 *     }
 *   }}
 * />
 */
import React, {
  ReactNode,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"

import { usePrevious } from "../lib/helpers"

interface ValueSpec {
  [key: string]: string
}

interface CSSData {
  [key: string]: ValueSpec
}

function buildCSSChunk(propName: string, propSpec: ValueSpec): string {
  return Object.keys(propSpec).map(color => {
    const selector: string = propSpec[color]
      .trim()
      .replace(/,$/, "") // forgive trailing commas on selectors
      .replace(/\n\s*/g, "\n") // remove indentation in template strings

    return `${selector} {\n${propName}: ${color};\n}`
  }).join("\n")
}

function buildCSSStyles(data: CSSData | null): string {
  if (!data) {
    return ""
  }

  return Object.keys(data).map(propName => {
    return`${buildCSSChunk(propName, data[propName])}\n`
  }).join("")
}

function removeStyleTag(tag: HTMLStyleElement) {
  tag.parentNode?.removeChild(tag)
}

function createStyleTag(id: string): HTMLStyleElement {
  const styleTag = document.createElement("style")
  styleTag.setAttribute("type", "text/css")
  styleTag.setAttribute("id", id)
  return styleTag
}

export interface ThemeProps {
  children?: ReactNode
  data: CSSData | null
}

function Theme({ children, data }: ThemeProps) {

  const prevData = usePrevious(data)
  const { current: id } = useRef<string>(`qm-${String(Date.now()).slice(9)}-${String(Math.random()).slice(2, 6)}`)

  const [stylesInjected, setStylesInjected] = useState(false)
  const [prevStyles, setPrevStyles] = useState("")

  const tag: HTMLStyleElement = useMemo(() => createStyleTag(id), [id])

  const updateStyles = useCallback(() => {
    if (data === prevData) {
      return
    }

    const newStyles = buildCSSStyles(data)

    if (newStyles !== prevStyles) {
      tag.innerHTML = newStyles
      setPrevStyles(newStyles)
    }
  }, [
    data,
    prevData,
    prevStyles,
    setPrevStyles,
    tag,
  ])

  if (!stylesInjected) {
    document.head.appendChild(tag)
    updateStyles()
    setStylesInjected(true)
  }

  useEffect(() => {
    updateStyles()
  }, [data, updateStyles])

  useEffect(() => () => {
    removeStyleTag(tag)
  }, [tag])

  if (!stylesInjected) {
    return null
  }

  return (
    <>
     {children}
    </>
  )
}

Theme.displayName = "Theme"

export default memo(Theme)
