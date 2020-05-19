import type { AnimationProps } from "../Animation"

import {
  Data,
  MenuState,
} from "./menuTypes"

export function getInitialSubmenuState(data: Data[], state: MenuState = {}): MenuState {
  data.forEach(item => {
    if (item.type === "submenu") {
      state[item.key] = {
        isOpen: !!item.startOpen,
        hasToggled: false,
      }
    }
  })
  return state
}

export function genAnimProps(
  animate: boolean | Pick<AnimationProps, "direction" | "duration"> | undefined,
  isOpen: boolean,
): AnimationProps {

  let animProps: AnimationProps = { type: isOpen ? "fadeIn" : "fadeOut" }

  if (typeof animate === "object") {
    animProps = { ...animProps, ...animate }
  } else if (!animate) {
    animProps.override = isOpen ? "show" : "hide"
  }

  return animProps
}
