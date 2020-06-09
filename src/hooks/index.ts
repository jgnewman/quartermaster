import {
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
} from "react"

import {
  RefFunction,
} from "../lib/helperTypes"

import {
  createId,
} from "../lib/helpers"

export type NullableRefObject = MutableRefObject<any> | null

export function useId() {
  return useMemo(function () {
    return createId()
  }, [])
}

export function useMergedRefs(refA: NullableRefObject, refB: NullableRefObject): RefFunction {
  return useMemo(function () {
    return function (value: HTMLElement | null) {
      [refA, refB].forEach(ref => {
        if (ref) {
          ref.current = value
        }
      })
    }
  }, [refA, refB])
}

export function usePrevious<T>(value: T) {
  const ref = useRef<T>()
  useEffect(() => { ref.current = value })
  return ref.current
}
