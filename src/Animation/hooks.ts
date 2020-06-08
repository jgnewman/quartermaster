import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react"

export function useHider(
  isHidden: boolean,
  setHidden: Dispatch<SetStateAction<boolean>>,
  shouldUseHider: boolean,
  isOverrideHide: boolean,
  duration: number,
  type: "fadeIn" | "fadeOut",
) {

  useEffect(function () {
    if (!isHidden && shouldUseHider) {
      if (isOverrideHide) {
        setHidden(true)
      } else if (type === "fadeOut") {
        setTimeout(() => setHidden(true), duration)
      }
    }

    if (isHidden && (!shouldUseHider || type === "fadeIn")) {
      setHidden(false)
    }
  }, [
    isHidden,
    isOverrideHide,
    shouldUseHider,
    setHidden,
    duration,
    type,
  ])
}

export function useDetachedElements(
  displayNoneOnHide: boolean,
  duration: number,
  isOverrideHide: boolean,
  removeOnHide: boolean,
  type: "fadeIn" | "fadeOut",
): [boolean, boolean] {

  const [isDetached, setDetached] = useState(isOverrideHide)
  const [isRemoved, setRemoved] = useState(isOverrideHide)

  useHider(
    isDetached,
    setDetached,
    displayNoneOnHide,
    isOverrideHide,
    duration,
    type,
  )

  useHider(
    isRemoved,
    setRemoved,
    removeOnHide,
    isOverrideHide,
    duration,
    type,
  )

  return [isDetached, isRemoved]
}
