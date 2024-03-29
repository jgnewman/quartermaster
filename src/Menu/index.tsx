import "./styles.styl"

import React, {
  memo,
  useRef,
  useState,
} from "react"

import {
  buildClassNames,
} from "../lib/helpers"

import Animation, { AnimationProps } from "../Animation"
import Space from "../Space"
import Triangle from "../icons/Triangle"

import {
 Data,
 MenuState,
 SubAnimate,
} from "./types"

import {
  useCloseMenuOnClickAway,
  useCloseSubMenuOnBlur,
  useSubmenuClickHandler,
  useSubmenuKeyHandler,
} from "./hooks"

import { getInitialSubmenuState, genAnimProps } from "./helpers"
import MenuLabel from "./MenuLabel"
import MenuLink from "./MenuLink"
import MenuSeparator from "./MenuSeparator"

interface SubmenuProps {
  animate?: boolean | SubAnimate
  childIsLifted?: boolean
  data: Data[]
  isCompact?: boolean
  isCollapsible?: boolean
  maxWidth?: string
  menuKey: string | number
  menuState: MenuState
  minWidth?: string
  parentIsLifted?: boolean
  posX?: "left" | "right"
  posY?: "top" | "bottom"
  setMenuState: (x: any) => void
  startOpen?: boolean
  text: string
  type: "submenu"
}

const Submenu = memo(function ({
  animate,
  childIsLifted,
  data,
  isCollapsible,
  isCompact,
  maxWidth,
  menuKey,
  menuState,
  minWidth,
  parentIsLifted,
  posX = "right",
  posY = "bottom",
  setMenuState,
  startOpen,
  text,
}: SubmenuProps) {

  const submenuRef = useRef<HTMLDivElement>(null)
  const isLifted = typeof childIsLifted === "boolean" ? childIsLifted : !!parentIsLifted
  const { isOpen, hasToggled } = menuState[menuKey]
  const smallPad = isCompact ? "xs" : "s"
  const largePad = isCompact ? "m" : "l"

  const clickHandler = useSubmenuClickHandler(
    isOpen,
    menuKey,
    menuState,
    setMenuState,
  )

  const keyHandler = useSubmenuKeyHandler(clickHandler)

  useCloseSubMenuOnBlur(
    menuKey,
    menuState,
    setMenuState,
    submenuRef,
  )

  const animProps: boolean | AnimationProps = animate === true ? true : !animate ? false : {
    type: isOpen ? "fadeIn" : "fadeOut",
  }

  if (typeof animate === "object" && typeof animProps === "object") {
    if (isOpen && animate.inDirection) {
      animProps.direction = animate.inDirection
    }

    if (isOpen && animate.inDuration) {
      animProps.duration = animate.inDuration
    }

    if (!isOpen && animate.outDirection) {
      animProps.direction = animate.outDirection
    }

    if (!isOpen && animate.outDuration) {
      animProps.duration = animate.outDuration
    }

    if (startOpen && !hasToggled) {
      animProps.override = "show"
    }

    if (!startOpen && !hasToggled) {
      animProps.override = "hide"
    }

    animProps.displayNoneOnHide = true
  }

  const canAnimate = !!animProps
  const isMenuBottom = posY === "bottom"
  const isMenuTop = !isMenuBottom

  const buttonClasses = buildClassNames({
    isCollapsible,
  })

  const iconClasses = buildClassNames({
    isCompact,
    isFlipped: (isOpen && isMenuBottom) || (!isOpen && isMenuTop),
  })

  const menuClasses = buildClassNames({
    canAnimate,
    isCollapsible,
    isMenuBottom,
    isMenuLeft: posX === "left",
    isMenuRight: posX === "right",
    isMenuTop,
  })

  return (
    <div
      className={`qmMenuSubmenuLink ${buttonClasses}`}
      onClick={clickHandler}
      onKeyPress={keyHandler}
      ref={submenuRef}
      role="button"
      tabIndex={0}
      aria-label={text}
    >
      <Space
        className="qmMenuLinkContent"
        top={smallPad}
        right={largePad}
        bottom={smallPad}
        left={largePad}>

        <span className="qmMenuLinkText">
          {text}
        </span>

        {canAnimate && (
          <Triangle
            className={`qmMenuSubmenuIcon ${iconClasses}`}
            size="s"
          />
        )}

      </Space>

      <Menu
        className={`qmMenuSubmenu ${menuClasses}`}
        animate={animProps}
        data={data}
        isCompact={isCompact}
        isLifted={isLifted}
        isOpen={isOpen}
        maxWidth={maxWidth}
        minWidth={minWidth}
      />
    </div>
  )
})

Submenu.displayName = "Submenu"

export interface MenuProps {
  animate?: boolean | Pick<AnimationProps, "direction" | "duration">
  className?: string
  data: Data[]
  isCompact?: boolean
  isLifted?: boolean
  isOpen: boolean
  maxWidth?: string
  minWidth?: string
}

function Menu({
  animate,
  className,
  data,
  isCompact,
  isLifted,
  isOpen,
  minWidth,
  maxWidth,
}: MenuProps) {

  const menuRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState(getInitialSubmenuState(data))

  useCloseMenuOnClickAway(
    menuRef,
    setState,
    state,
  )

  const animProps = genAnimProps(animate, isOpen)

  const style = {
    minWidth: minWidth || "initial",
    maxWidth: maxWidth || "initial",
  }

  const helperClasses = buildClassNames({
    isCompact,
    isLifted,
    isOpen,
  })

  return (
    <Animation
      ref={menuRef}
      className={`qmMenuContainer ${helperClasses} ${className || ""}`}
      style={style}
      {...animProps}>
      <div className="qmMenuList" role="list" aria-expanded={!!isOpen}>
        {data.map((item, index) => {
          switch (item.type) {

            case "label":
              return (
                <MenuLabel
                  key={index}
                  isCompact={isCompact}
                  text={item.text}
                />
              )

            case "link":
              return (
                <MenuLink
                  {...item}
                  key={index}
                  isCompact={isCompact}
                />
              )

            case "submenu":
              return (
                <Submenu
                  {...item}
                  key={index}
                  childIsLifted={item.isLifted}
                  isCompact={isCompact}
                  menuKey={item.key}
                  menuState={state}
                  parentIsLifted={isLifted}
                  setMenuState={setState}
                />
              )

            case "separator":
            default:
              return (
                <MenuSeparator
                  key={index}
                  isCompact={isCompact}
                />
              )
          }
        })}
      </div>
    </Animation>
  )
}

Menu.displayName = "Menu"

export default memo(Menu)
