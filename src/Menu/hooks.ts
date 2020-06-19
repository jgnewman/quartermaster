import {
  Dispatch,
  KeyboardEvent,
  MouseEvent,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
} from "react"

import {
  elemInEventPath,
} from "../lib/helpers"

import {
  MenuState,
} from "./types"

export function useSubmenuClickHandler(
  isOpen: boolean,
  menuKey: string | number,
  menuState: MenuState,
  setMenuState: (x: any) => void,
) {

  return useCallback(function (evt: MouseEvent | KeyboardEvent) {
    evt.stopPropagation()
    setMenuState({ ...menuState, [menuKey]: {
      isOpen: !isOpen,
      hasToggled: true,
    }})
  }, [
    isOpen,
    menuKey,
    menuState,
    setMenuState,
  ])
}

export function useSubmenuKeyHandler(clickHandler: (evt: MouseEvent | KeyboardEvent) => void) {
  return useCallback(function (evt: KeyboardEvent) {
    if (evt.key === "Enter" || evt.key === " ") {
      evt.preventDefault()
      clickHandler(evt)
    }
  }, [clickHandler])
}

export function useCloseSubMenuOnBlur(
  menuKey: string | number,
  menuState: MenuState,
  setMenuState: Dispatch<SetStateAction<MenuState>>,
  submenuRef: RefObject<HTMLDivElement>,
) {

  const { isOpen } = menuState[menuKey]

  const focusWatcher = useCallback(function () {
    const { current: currentSubmenu } = submenuRef

    if (!isOpen || !currentSubmenu) {
      return
    }

    if (!currentSubmenu.contains(document.activeElement)) {
      setMenuState({ ...menuState, [menuKey]: {
        isOpen: false,
        hasToggled: true,
      }})
    }
  }, [
    isOpen,
    menuKey,
    menuState,
    setMenuState,
    submenuRef,
  ])

  return useEffect(function () {
    document.addEventListener('focusin', focusWatcher)
    return function () {
      document.removeEventListener('focusin', focusWatcher)
    }
  }, [focusWatcher])
}

export function useCloseMenuOnClickAway(
  menuRef: RefObject<HTMLDivElement>,
  setState: Dispatch<SetStateAction<MenuState>>,
  state: MenuState,
) {
  const closeOnClickAway = useCallback(function (evt: any) {
    const { current: currentMenuRef } = menuRef

    if (elemInEventPath(currentMenuRef, evt)) {
      return
    }

    const newState: MenuState = {}

    Object.keys(state).forEach(key => {
      const { isOpen, hasToggled } = state[key]
      if (isOpen && hasToggled) {
        newState[key] = { isOpen: false, hasToggled }
      } else if (state[key]) {
        newState[key] = { ...state[key] }
      }
    })

    setState({ ...state, ...newState })
  }, [
    menuRef,
    state,
    setState,
  ])

  useEffect(function () {
    document.addEventListener("click", closeOnClickAway)
    return function () {
      document.removeEventListener("click", closeOnClickAway)
    }
  }, [closeOnClickAway])
}
